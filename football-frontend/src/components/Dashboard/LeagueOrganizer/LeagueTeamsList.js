import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Button, Stack, CircularProgress } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PaginationComponent from '../../Common/PaginationComponent';
import API from '../../../services/api';

function LeagueTeamsList({ league, onBack }) {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Pagination Logic
    const [page, setPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        const fetchLeagueTeams = async () => {
            try {
                const response = await API.get(`/team/league/${league.id || league.Id}`);
                setTeams(response.data);
            } catch (error) {
                console.error("Error fetching league teams:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchLeagueTeams();
    }, [league]);

    // Υπολογισμός στοιχείων τρέχουσας σελίδας
    const indexOfLastItem = page * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTeams = teams.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (event, value) => {
        setPage(value);
        window.scrollTo(0, 0);
    };

    if (loading) return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
            <CircularProgress color="success" />
        </Box>
    );

    return (
        <Box>
            <Button 
                onClick={onBack} 
                variant="text" 
                color="success" 
                startIcon={<ArrowBackIcon />} 
                sx={{ mb: 2, fontWeight: 'bold' }}
            >
                Πίσω στις Λίγκες
            </Button>

            <Typography variant="h4" sx={{ mb: 1, fontWeight: 'bold', color: '#333' }}>
                {league.name || league.Name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" sx={{ mb: 4 }}>
                Συμμετέχουσες Ομάδες ({teams.length})
            </Typography>

            {teams.length === 0 ? (
                <Paper 
                    sx={{ 
                        p: 5, 
                        textAlign: 'center', 
                        bgcolor: '#fafafa', 
                        border: '1px dashed #ccc',
                        borderRadius: 2,
                        mt: 2 
                    }}
                >
                    <Typography color="textSecondary" variant="body1">
                        Δεν υπάρχουν ακόμα εγγεγραμμένες ομάδες σε αυτή τη διοργάνωση.
                    </Typography>
                </Paper>
            ) : (
                <>
                    <Stack spacing={2}>
                        {currentTeams.map((team) => (
                            <Paper 
                                key={team.id || team.Id} 
                                elevation={1} 
                                sx={{ 
                                    p: 2, 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: 2, 
                                    borderRadius: 2,
                                    borderLeft: '5px solid #1b5e20' 
                                }}
                            >
                                <GroupsIcon sx={{ color: '#1b5e20', fontSize: 30 }} />
                                <Box>
                                    <Typography variant="h6" sx={{ lineHeight: 1.2, fontWeight: 'bold' }}>
                                        {team.name || team.Name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Πόλη: {team.city || team.City}
                                    </Typography>
                                </Box>
                            </Paper>
                        ))}
                    </Stack>

                    <PaginationComponent 
                        count={Math.ceil(teams.length / itemsPerPage)} 
                        page={page} 
                        onChange={handlePageChange} 
                    />
                </>
            )}
        </Box>
    );
}

export default LeagueTeamsList;