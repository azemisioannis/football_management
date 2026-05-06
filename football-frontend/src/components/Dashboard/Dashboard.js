import React, { useState, useEffect } from 'react';
import { Box, CssBaseline, CircularProgress, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import API from '../../services/api';

import Sidebar from '../Layout/Sidebar';
import Navbar from '../Layout/Navbar';
import LeagueSetup from './LeagueOrganizer/LeagueSetup';
import LeagueList from './LeagueOrganizer/LeagueList'; 
import LeagueTeamsList from './LeagueOrganizer/LeagueTeamsList';
import TeamList from './TeamManager/TeamList';
import TeamSetup from './TeamManager/TeamSetup';
import PlayerManager from './TeamManager/PlayerManager';

function Dashboard() {
    const navigate = useNavigate();
    
    // States για δεδομένα
    const [leagues, setLeagues] = useState([]); // Λίγκες του συγκεκριμένου Organizer
    const [allLeagues, setAllLeagues] = useState([]); // Όλες οι λίγκες (για χρήση από Manager)
    const [teams, setTeams] = useState([]); // Ομάδες του συγκεκριμένου Manager
    
    // States για επιλογή και πλοήγηση
    const [selectedTeam, setSelectedTeam] = useState(null); 
    const [selectedLeague, setSelectedLeague] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState(''); 

    // Ανάκτηση των λιγκών του Organizer
    const fetchLeagues = async (userId) => {
        try {
            const response = await API.get(`/league/user/${userId}`);
            setLeagues(response.data);
        } catch (error) {
            console.error("Error fetching user leagues:", error);
        }
    };

    // Ανάκτηση ΟΛΩΝ των λιγκών (για το dropdown του Manager)
    const fetchAllLeagues = async () => {
        try {
            const response = await API.get('/league');
            setAllLeagues(response.data);
        } catch (error) {
            console.error("Error fetching all leagues:", error);
        }
    };

    // Ανάκτηση των ομάδων του Manager
    const fetchTeams = async (userId) => {
        try {
            const response = await API.get(`/team/user/${userId}`);
            setTeams(response.data);
        } catch (error) {
            console.error("Error fetching teams:", error);
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

    // Αρχικός έλεγχος Role και φόρτωση δεδομένων
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) { navigate('/'); return; }
        try {
            const decoded = jwtDecode(token);
            const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
            setUserRole(role);
            
            if (role === 'league_organizer') {
                setView('my_leagues');
                fetchLeagues(decoded.userId);
            } else if (role === 'team_manager') {
                setView('my_teams');
                fetchTeams(decoded.userId);
                fetchAllLeagues();
            }
            
            setLoading(false);
        } catch (e) { navigate('/'); }
    }, [navigate]);

    // Συνάρτηση ανανέωσης δεδομένων
    const refreshData = () => {
        const token = localStorage.getItem('token');
        if (!token) return;
        const decoded = jwtDecode(token);
        
        if (userRole === 'league_organizer') {
            fetchLeagues(decoded.userId);
        } else if (userRole === 'team_manager') {
            fetchTeams(decoded.userId);
            fetchAllLeagues();
        }
    };

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress color="success" /></Box>;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Navbar onLogout={() => { localStorage.clear(); navigate('/'); }} />
            <Sidebar setView={setView} currentView={view} />

            <Box component="main" sx={{ flexGrow: 1, p: 4, minHeight: '100vh' }}>
                <Toolbar />

                {/* --- SECTION: LEAGUE ORGANIZER --- */}
                {userRole === 'league_organizer' && (
                    <>
                        {view === 'my_leagues' && (
                            <LeagueList 
                                leagues={leagues} 
                                onDelete={refreshData} 
                                onViewTeams={(league) => {
                                    setSelectedLeague(league);
                                    setView('view_league_teams');
                                }}
                            />
                        )}
                        
                        {view === 'view_league_teams' && (
                            <LeagueTeamsList 
                                league={selectedLeague} 
                                onBack={() => setView('my_leagues')} 
                            />
                        )}

                        {view === 'add_league' && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
                                <LeagueSetup onLeagueCreated={() => { refreshData(); setView('my_leagues'); }} />
                            </Box>
                        )}
                    </>
                )}

                {/* --- SECTION: TEAM MANAGER --- */}
                {userRole === 'team_manager' && (
                    <>
                        {view === 'my_teams' && (
                            <TeamList 
                                teams={teams} 
                                allLeagues={allLeagues} 
                                onManagePlayers={(team) => {
                                    setSelectedTeam(team);
                                    setView('manage_roster');
                                }} 
                                onDeleteTeam={handleDeleteTeam}
                                refreshData={refreshData}
                            />
                        )}

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
                                <PlayerManager teamId={selectedTeam?.Id || selectedTeam?.id} />
                            </Box>
                        )}

                        {view === 'add_team' && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
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