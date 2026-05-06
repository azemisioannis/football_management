import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Button, Stack, CircularProgress, Divider } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import API from '../../../services/api';

function LeagueTeamsList({ league, onBack }) {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeagueTeams = async () => {
            try {
                // Χρησιμοποιούμε το endpoint που φέρνει ομάδες βάσει LeagueId
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

    if (loading) return <CircularProgress color="success" sx={{ display: 'block', mx: 'auto', mt: 5 }} />;

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
                <Paper sx={{ p: 4, textAlign: 'center', bgcolor: '#f9f9f9' }}>
                    <Typography color="textSecondary">
                        Δεν έχουν εγγραφεί ακόμα ομάδες σε αυτή τη διοργάνωση.
                    </Typography>
                </Paper>
            ) : (
                <Stack spacing={2}>
                    {teams.map((team) => (
                        <Paper 
                            key={team.id || team.Id} 
                            elevation={1} 
                            sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2, borderRadius: 2 }}
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
            )}
        </Box>
    );
}

export default LeagueTeamsList;