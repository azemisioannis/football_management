import React, { useState, useEffect } from 'react';
import { 
    Box, Typography, Paper, Button, Stack, 
    Select, MenuItem, FormControl, InputLabel 
} from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import DeleteIcon from '@mui/icons-material/Delete';
import LinkIcon from '@mui/icons-material/Link';
import PaginationComponent from '../../Common/PaginationComponent';
import API from '../../../services/api';

function TeamList({ teams, allLeagues, onManagePlayers, onDeleteTeam, refreshData }) {
    const [page, setPage] = useState(1);
    const itemsPerPage = 5;
    
    // State για να κρατάμε ποια λίγκα επιλέχθηκε για κάθε ομάδα (π.χ. { teamId: leagueId })
    const [selectedLeagues, setSelectedLeagues] = useState({});

    // Επαναφορά σελίδας αν η τρέχουσα σελίδα μείνει κενή μετά από διαγραφή
    useEffect(() => {
        const totalPages = Math.ceil(teams.length / itemsPerPage);
        if (page > totalPages && totalPages > 0) {
            setPage(totalPages);
        }
    }, [teams.length, page]);

    // Σύνάρτηση για τη σύνδεση της ομάδας με τη λίγκα
    const handleJoinLeague = async (teamId) => {
        const leagueId = selectedLeagues[teamId];
        if (!leagueId) {
            alert("Παρακαλώ επιλέξτε μια λίγκα πρώτα.");
            return;
        }

        try {
            // Κλήση στο νέο Put endpoint που έφτιαξες
            await API.put(`/team/${teamId}/join-league/${leagueId}`);
            alert("Η ομάδα συνδέθηκε επιτυχώς!");
            refreshData(); // Ανανέωση των δεδομένων στο Dashboard
        } catch (error) {
            console.error("Error joining league:", error);
            alert("Σφάλμα κατά τη σύνδεση στη λίγκα.");
        }
    };

    const handlePageChange = (event, value) => {
        setPage(value);
        window.scrollTo(0, 0);
    };

    // Υπολογισμός στοιχείων σελίδας
    const indexOfLastItem = page * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTeams = teams.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: '#1b5e20' }}>
                Οι Ομάδες μου
            </Typography>

            <Stack spacing={2}>
                {currentTeams.map((team) => (
                    <Paper 
                        key={team.Id || team.id} 
                        elevation={2} 
                        sx={{ p: 3, borderRadius: 2, borderLeft: '6px solid #1b5e20' }}
                    >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <GroupsIcon color="success" /> {team.Name || team.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                                    Πόλη: {team.City || team.city}
                                </Typography>

                                {/* --- ΕΝΟΤΗΤΑ ΣΥΝΔΕΣΗΣ ΜΕ ΛΙΓΚΑ --- */}
                                {(!team.LeagueId && !team.league_id) ? (
                                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                        <FormControl size="small" sx={{ minWidth: 200 }}>
                                            <InputLabel>Επιλογή Λίγκας</InputLabel>
                                            <Select
                                                label="Επιλογή Λίγκας"
                                                value={selectedLeagues[team.id || team.Id] || ''}
                                                onChange={(e) => setSelectedLeagues({
                                                    ...selectedLeagues,
                                                    [team.id || team.Id]: e.target.value
                                                })}
                                            >
                                                {allLeagues.map((l) => (
                                                    <MenuItem key={l.id || l.Id} value={l.id || l.Id}>
                                                        {l.name || l.Name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <Button 
                                            variant="contained" 
                                            size="small" 
                                            startIcon={<LinkIcon />}
                                            onClick={() => handleJoinLeague(team.id || team.Id)}
                                            sx={{ bgcolor: '#1976d2' }}
                                        >
                                            Σύνδεση
                                        </Button>
                                    </Box>
                                ) : (
                                    <Typography 
                                        variant="caption" 
                                        sx={{ 
                                            bgcolor: '#e8f5e9', 
                                            color: '#2e7d32', 
                                            px: 1.5, 
                                            py: 0.5, 
                                            borderRadius: 1,
                                            fontWeight: 'bold',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: 0.5
                                        }}
                                    >
                                        ✓ ΕΓΓΕΓΡΑΜΜΕΝΗ ΣΕ ΛΙΓΚΑ
                                    </Typography>
                                )}
                            </Box>

                            {/* --- ΚΟΥΜΠΙΑ ΕΝΕΡΓΕΙΩΝ --- */}
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <Button 
                                    variant="contained" 
                                    color="success" 
                                    startIcon={<PersonSearchIcon />} 
                                    onClick={() => onManagePlayers(team)}
                                >
                                    Ρόστερ
                                </Button>
                                <Button 
                                    variant="outlined" 
                                    color="error" 
                                    startIcon={<DeleteIcon />} 
                                    onClick={() => onDeleteTeam(team.Id || team.id)}
                                >
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