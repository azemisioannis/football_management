import React, { useState, useEffect } from 'react';
import { Box, CssBaseline, CircularProgress, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import API from '../../services/api';

import Sidebar from '../Layout/Sidebar';
import Navbar from '../Layout/Navbar';
import LeagueSetup from './LeagueOrganizer/LeagueSetup';
import LeagueList from './LeagueOrganizer/LeagueList'; 
import TeamList from './TeamManager/TeamList';
import TeamSetup from './TeamManager/TeamSetup';
import PlayerManager from './TeamManager/PlayerManager';

function Dashboard() {
    const navigate = useNavigate();
    const [leagues, setLeagues] = useState([]);
    const [teams, setTeams] = useState([]); // State για τις ομάδες του Manager
    const [selectedTeam, setSelectedTeam] = useState(null); // Η ομάδα που επιλέγεται για διαχείριση ρόστερ
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState(''); 

    // Ανάκτηση των διοργανώσεων που ανήκουν στον συγκεκριμένο χρήστη από το API
    const fetchLeagues = async (userId) => {
        try {
            const response = await API.get(`/league/user/${userId}`);
            setLeagues(response.data);
        } catch (error) {
            console.error("Error:", error);
            setLeagues([]); 
        }
    };

    // Ανάκτηση των ομάδων που ανήκουν στον συγκεκριμένο Manager
    const fetchTeams = async (userId) => {
        try {
            const response = await API.get(`/team/user/${userId}`);
            setTeams(response.data);
        } catch (error) {
            console.error("Error fetching teams:", error);
            setTeams([]);
        }
    };

    // Διαγραφή ομάδας
    const handleDeleteTeam = async (teamId) => {
        if (window.confirm("Είστε σίγουροι ότι θέλετε να διαγράψετε την ομάδα;")) {
            try {
                await API.delete(`/team/${teamId}`);
                refreshData();
            } catch (error) {
                console.error("Error deleting team:", error);
            }
        }
    };

    // Έλεγχος αυθεντικοποίησης και ανάκτηση ρόλου χρήστη κατά το mount του component
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) { navigate('/'); return; }
        try {
            const decoded = jwtDecode(token);
            // Εξαγωγή του ρόλου από τα claims του JWT
            const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
            setUserRole(role);
            
            // Καθορισμός αρχικού view και φόρτωση δεδομένων βάσει ρόλου
            if (role === 'league_organizer') {
                setView('my_leagues');
                fetchLeagues(decoded.userId);
            } else if (role === 'team_manager') {
                setView('my_teams');
                fetchTeams(decoded.userId);
            }
            
            setLoading(false);
        } catch (e) { navigate('/'); }
    }, [navigate]);

    // Χειροκίνητη ανανέωση των δεδομένων μετά από ενέργειες (π.χ. δημιουργία ή διαγραφή)
    const refreshData = () => {
        const token = localStorage.getItem('token');
        if (!token) return;
        const decoded = jwtDecode(token);
        
        if (userRole === 'league_organizer') {
            fetchLeagues(decoded.userId);
        } else if (userRole === 'team_manager') {
            fetchTeams(decoded.userId);
        }
    };

    // Προβολή loading spinner κατά τη διάρκεια της αρχικής φόρτωσης
    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress color="success" /></Box>;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Navbar onLogout={() => { localStorage.clear(); navigate('/'); }} />
            <Sidebar setView={setView} currentView={view} />

            <Box component="main" sx={{ flexGrow: 1, p: 4, minHeight: '100vh' }}>
                <Toolbar />

                {/* Περιβάλλον League Organizer */}
                {userRole === 'league_organizer' && (
                    <>
                        {/* Προβολή λίστας διοργανώσεων */}
                        {view === 'my_leagues' && (
                            <LeagueList leagues={leagues} onDelete={refreshData} />
                        )}
                        
                        {/* Φόρμα δημιουργίας νέας διοργανώσης */}
                            {view === 'add_league' && (
                                <Box sx={{ 
                                    display: 'flex', 
                                    justifyContent: 'center', 
                                    alignItems: 'center', 
                                    minHeight: '70vh' // Αυτό θα το φέρει στο κέντρο καθ' ύψος
                                }}>
                                    <LeagueSetup onLeagueCreated={() => { refreshData(); setView('my_leagues'); }} />
                                </Box>
                            )}
                    </>
                )}

                {/* Περιβάλλον Team Manager */}
                {userRole === 'team_manager' && (
                    <>
                        {/* Λίστα Ομάδων */}
                        {view === 'my_teams' && (
                            <TeamList 
                                teams={teams} 
                                onManagePlayers={(team) => {
                                    setSelectedTeam(team);
                                    setView('manage_roster');
                                }} 
                                onDeleteTeam={handleDeleteTeam}
                            />
                        )}

                        {/* Διαχείριση Ρόστερ συγκεκριμένης ομάδας */}
                        {view === 'manage_roster' && (
                            <Box>
                                <Button 
                                    onClick={() => setView('my_teams')} 
                                    variant="outlined" 
                                    color="success" 
                                    sx={{ mb: 3 }}
                                >
                                    ← Επιστροφή στις Ομάδες
                                </Button>
                                <Typography variant="h4" sx={{ mb: 1, fontWeight: 'bold' }}>
                                    {selectedTeam?.Name || selectedTeam?.name}
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary" sx={{ mb: 4 }}>
                                    Διαχείριση Παικτών και Ρόστερ
                                </Typography>
                                <PlayerManager teamId={selectedTeam?.Id || selectedTeam?.id} />
                            </Box>
                        )}

                        {/* Δημιουργία Νέας Ομάδας */}
                        {view === 'add_team' && (
                            <Box sx={{ maxWidth: 600, mx: 'auto' }}>
                                <TeamSetup onTeamCreated={() => { refreshData(); setView('my_teams'); }} />
                            </Box>
                        )}
                    </>
                )}
            </Box>
        </Box>
    );
}

export default Dashboard;