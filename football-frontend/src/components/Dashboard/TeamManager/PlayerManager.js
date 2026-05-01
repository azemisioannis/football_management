import React, { useState } from 'react';
import { 
    Box, Paper, Typography, Table, TableBody, TableCell, 
    TableContainer, TableHead, TableRow, Button, TextField, 
    Select, MenuItem, IconButton, InputLabel, FormControl 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

function PlayerManager({ teamId }) {
    const [players, setPlayers] = useState([]);
    const [newPlayer, setNewPlayer] = useState({
        first_name: '',
        last_name: '',
        position: 'GK' 
    });

    // Ενημέρωση των στοιχείων του υπό δημιουργία παίκτη
    const handleChange = (e) => {
        setNewPlayer({ ...newPlayer, [e.target.name]: e.target.value });
    };

    // Προσθήκη παίκτη στη λίστα και reset της φόρμας
    const handleAddPlayer = (e) => {
        e.preventDefault();
        // Μελλοντική υλοποίηση API call: POST /players
        
        const playerWithId = { ...newPlayer, id: Date.now() }; 
        setPlayers([...players, playerWithId]);
        
        setNewPlayer({ first_name: '', last_name: '', position: 'GK' });
    };

    // Αφαίρεση παίκτη από το τρέχον state
    const handleDelete = (id) => {
        // Μελλοντική υλοποίηση API call: DELETE /players/:id
        setPlayers(players.filter(p => p.id !== id));
    };

    return (
        <Box>
            {/* Φόρμα Προσθήκης Παίκτη */}
            <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
                <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PersonAddIcon color="success" /> Προσθήκη Νέου Παίκτη
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
                            <MenuItem value="GK">GK (Τερματοφύλακας)</MenuItem>
                            <MenuItem value="DF">DF (Αμυντικός)</MenuItem>
                            <MenuItem value="MF">MF (Μέσος)</MenuItem>
                            <MenuItem value="FW">FW (Επιθετικός)</MenuItem>
                        </Select>
                    </FormControl>
                    <Button type="submit" variant="contained" color="success">
                        ΠΡΟΣΘΗΚΗ
                    </Button>
                </Box>
            </Paper>

            {/* Πίνακας Προβολής Ρόστερ */}
            <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
                <Table>
                    <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                        <TableRow>
                            <TableCell><strong>Όνομα</strong></TableCell>
                            <TableCell><strong>Επίθετο</strong></TableCell>
                            <TableCell><strong>Θέση</strong></TableCell>
                            <TableCell align="right"><strong>Ενέργειες</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {players.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} align="center" sx={{ py: 3 }}>
                                    Δεν υπάρχουν παίκτες στο ρόστερ.
                                </TableCell>
                            </TableRow>
                        ) : (
                            players.map((player) => (
                                <TableRow key={player.id} hover>
                                    <TableCell>{player.first_name}</TableCell>
                                    <TableCell>{player.last_name}</TableCell>
                                    <TableCell>{player.position}</TableCell>
                                    <TableCell align="right">
                                        <IconButton color="error" onClick={() => handleDelete(player.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default PlayerManager;