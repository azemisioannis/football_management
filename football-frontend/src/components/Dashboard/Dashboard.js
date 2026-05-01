import React, { useState, useEffect } from 'react';
import { Box, CssBaseline, CircularProgress, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import API from '../../services/api';

import Sidebar from '../Layout/Sidebar';
import Navbar from '../Layout/Navbar';
import LeagueSetup from './LeagueOrganizer/LeagueSetup';
import LeagueList from './LeagueOrganizer/LeagueList'; 

function Dashboard() {
    const navigate = useNavigate();
    const [leagues, setLeagues] = useState([]);
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState('my_leagues'); 

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

    // Έλεγχος αυθεντικοποίησης και ανάκτηση ρόλου χρήστη κατά το mount του component
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) { navigate('/'); return; }
        try {
            const decoded = jwtDecode(token);
            // Εξαγωγή του ρόλου από τα claims του JWT
            const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
            setUserRole(role);
            
            // Φόρτωση δεδομένων μόνο αν ο χρήστης είναι διοργανωτής
            if (role === 'league_organizer') fetchLeagues(decoded.userId);
            setLoading(false);
        } catch (e) { navigate('/'); }
    }, [navigate]);

    // Χειροκίνητη ανανέωση των δεδομένων μετά από ενέργειες (π.χ. δημιουργία ή διαγραφή)
    const refreshData = () => {
        const decoded = jwtDecode(localStorage.getItem('token'));
        fetchLeagues(decoded.userId);
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

                {/* Διαφοροποίηση περιεχομένου βάσει του ρόλου του χρήστη */}
                {userRole === 'league_organizer' ? (
                    <>
                        {/* Προβολή λίστας διοργανώσεων */}
                        {view === 'my_leagues' && (
                            <LeagueList leagues={leagues} onDelete={refreshData} />
                        )}
                        
                        {/* Φόρμα δημιουργίας νέας διοργανώσης */}
                        {view === 'add_league' && (
                            <Box sx={{ maxWidth: 600 }}>
                                <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>Νέα Λίγκα</Typography>
                                <LeagueSetup onLeagueCreated={() => { refreshData(); setView('my_leagues'); }} />
                            </Box>
                        )}
                    </>
                ) : (
                    <Typography variant="h5">Καλωσήρθες Manager!</Typography>
                )}
            </Box>
        </Box>
    );
}

export default Dashboard;