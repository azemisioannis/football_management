import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Button, Stack } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import DeleteIcon from '@mui/icons-material/Delete';
import PaginationComponent from '../../Common/PaginationComponent';

function TeamList({ teams, onManagePlayers, onDeleteTeam }) {
    const [page, setPage] = useState(1);
    const itemsPerPage = 5;

    // Διόρθωση σελίδας αν διαγραφούν στοιχεία
    useEffect(() => {
        const totalPages = Math.ceil(teams.length / itemsPerPage);
        if (page > totalPages && totalPages > 0) {
            setPage(totalPages);
        }
    }, [teams.length, page]);

    const handlePageChange = (event, value) => {
        setPage(value);
        window.scrollTo(0, 0);
    };

    const indexOfLastItem = page * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTeams = teams.slice(indexOfFirstItem, indexOfLastItem);

    if (!teams || teams.length === 0) {
        return (
            <Paper sx={{ p: 5, textAlign: 'center', bgcolor: '#fafafa', border: '1px dashed #ccc' }}>
                <Typography color="textSecondary">Δεν έχετε καταχωρίσει ακόμα κάποια ομάδα.</Typography>
            </Paper>
        );
    }

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: '#1b5e20' }}>
                Οι Ομάδες μου
            </Typography>

            <Stack spacing={2}>
                {currentTeams.map((team) => (
                    <Paper key={team.Id || team.id} elevation={2} sx={{ p: 3, borderRadius: 2, borderLeft: '6px solid #1b5e20' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <GroupsIcon color="success" /> {team.Name || team.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">Πόλη: {team.City || team.city}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <Button variant="contained" color="success" startIcon={<PersonSearchIcon />} onClick={() => onManagePlayers(team)}>
                                    Ρόστερ
                                </Button>
                                <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={() => onDeleteTeam(team.Id || team.id)}>
                                    Διαγραφή
                                </Button>
                            </Box>
                        </Box>
                    </Paper>
                ))}
            </Stack>

            <PaginationComponent 
                count={Math.ceil(teams.length / itemsPerPage)} 
                page={page} 
                onChange={handlePageChange} 
            />
        </Box>
    );
}

export default TeamList;