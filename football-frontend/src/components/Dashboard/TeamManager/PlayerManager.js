import React, { useState, useEffect } from 'react';
import { 
    Box, Paper, Typography, Table, TableBody, TableCell, 
    TableContainer, TableHead, TableRow, Button, TextField, 
    Select, MenuItem, InputLabel, FormControl 
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import API from '../../../services/api';
import PlayerRow from './PlayerRow'; // Εισαγωγή του νέου component

/**
 * Διαχείριση ρόστερ και προσθήκη παικτών για μια συγκεκριμένη ομάδα.
 */
function PlayerManager({ teamId }) {
    const [players, setPlayers] = useState([]);
    const [newPlayer, setNewPlayer] = useState({
        first_name: '',
        last_name: '',
        position: 'GK' 
    });

    // Φόρτωση των παικτών της ομάδας από το Backend
    useEffect(() => {
        if (teamId) fetchPlayers();
    }, [teamId]);

    const fetchPlayers = async () => {
        try {
            // Κλήση στο API για ανάκτηση παικτών βάσει TeamId
            const response = await API.get(`/player/team/${teamId}`);
            setPlayers(response.data);
        } catch (error) {
            console.error("Error fetching players:", error);
        }
    };

    const handleChange = (e) => {
        setNewPlayer({ ...newPlayer, [e.target.name]: e.target.value });
    };

    // Αποστολή νέου παίκτη στο Backend
    const handleAddPlayer = async (e) => {
        e.preventDefault();
        try {
            const playerData = {
                FirstName: newPlayer.first_name,
                LastName: newPlayer.last_name,
                Position: newPlayer.position,
                TeamId: teamId
            };

            await API.post('/player', playerData);
            setNewPlayer({ first_name: '', last_name: '', position: 'GK' });
            fetchPlayers(); // Ανανέωση πίνακα
        } catch (error) {
            console.error("Error adding player:", error);
            alert("Σφάλμα κατά την προσθήκη του παίκτη.");
        }
    };

    // Διαγραφή παίκτη μέσω API
    const handleDelete = async (id) => {
        if (window.confirm("Είστε σίγουροι για τη διαγραφή του παίκτη;")) {
            try {
                await API.delete(`/player/${id}`);
                fetchPlayers(); // Ανανέωση πίνακα
            } catch (error) {
                console.error("Error deleting player:", error);
            }
        }
    };

    return (
        <Box>
            {/* Φόρμα Εισαγωγής */}
            <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
                <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PersonAddIcon color="success" /> Προσθήκη Παίκτη
                </Typography>
                <Box component="form" onSubmit={handleAddPlayer} sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <TextField
                        label="Όνομα"
                        name="first_name"
                        size="small"
                        value={newPlayer.first_name}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Επίθετο"
                        name="last_name"
                        size="small"
                        value={newPlayer.last_name}
                        onChange={handleChange}
                        required
                    />
                    <FormControl size="small" sx={{ minWidth: 120 }}>
                        <InputLabel>Θέση</InputLabel>
                        <Select
                            name="position"
                            value={newPlayer.position}
                            label="Θέση"
                            onChange={handleChange}
                        >
                            <MenuItem value="GK">GK</MenuItem>
                            <MenuItem value="DF">DF</MenuItem>
                            <MenuItem value="MF">MF</MenuItem>
                            <MenuItem value="FW">FW</MenuItem>
                        </Select>
                    </FormControl>
                    <Button type="submit" variant="contained" color="success">
                        ΠΡΟΣΘΗΚΗ
                    </Button>
                </Box>
            </Paper>

            {/* Πίνακας Παικτών */}
            <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
                <Table>
                    <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                        <TableRow>
                            <TableCell><strong>Ονοματεπώνυμο</strong></TableCell>
                            <TableCell><strong>Θέση</strong></TableCell>
                            <TableCell align="right"><strong>Ενέργειες</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {players.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={3} align="center" sx={{ py: 3 }}>
                                    Το ρόστερ είναι άδειο.
                                </TableCell>
                            </TableRow>
                        ) : (
                            players.map((player) => (
                                <PlayerRow 
                                    key={player.id || player.Id} 
                                    player={player} 
                                    onDelete={handleDelete} 
                                />
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default PlayerManager;