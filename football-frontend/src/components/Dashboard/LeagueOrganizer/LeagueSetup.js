import React, { useState } from 'react';
import { Paper, TextField, Button, Typography, Box } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { jwtDecode } from 'jwt-decode';
import API from '../../../services/api';

function LeagueSetup({ onLeagueCreated }) {
    const [leagueData, setLeagueData] = useState({
        name: '',
        region: ''
    });

    // Ενημέρωση των πεδίων της φόρμας
    const handleChange = (e) => {
        setLeagueData({ ...leagueData, [e.target.name]: e.target.value });
    };

    // Υποβολή δεδομένων και αποθήκευση στη βάση
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const token = localStorage.getItem('token');
            if (!token) return;
            
            const decoded = jwtDecode(token);
            const userId = decoded.userId;

            // Δεδομένα για το API (Με κεφαλαία για το Dapper στο Backend)
            const payload = {
                Name: leagueData.name,
                Region: leagueData.region,
                UserId: userId
            };

            const response = await API.post('/league', payload);
            
            // Ενημέρωση του Dashboard και επιστροφή στη λίστα
            onLeagueCreated(response.data); 
            
        } catch (error) {
            console.error("Error creating league:", error);
            alert("Σφάλμα κατά τη δημιουργία. Το όνομα της λίγκας υπάρχει ήδη.");
        }
    };

    return (
        <Paper elevation={3} sx={{ p: 4, borderRadius: 4, maxWidth: 400, width: '100%' }}>
            {/* Κεφαλίδα με εικονίδιο και τίτλο */}
            <Box sx={{ textAlign: 'center', mb: 3 }}>
                <EmojiEventsIcon sx={{ fontSize: 50, color: '#fbc02d', mb: 1 }} />
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333' }}>
                    Νέα Λίγκα
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Συμπληρώστε τα στοιχεία της διοργάνωσης
                </Typography>
            </Box>

            {/* Φόρμα Δημιουργίας */}
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Όνομα Λίγκας"
                    name="name"
                    variant="outlined"
                    value={leagueData.name}
                    onChange={handleChange}
                    required
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="Περιοχή (Region)"
                    name="region"
                    variant="outlined"
                    value={leagueData.region}
                    onChange={handleChange}
                    required
                    sx={{ mb: 3 }}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="success"
                    size="large"
                    sx={{ py: 1.5, fontWeight: 'bold' }}
                >
                    ΔΗΜΙΟΥΡΓΙΑ
                </Button>
            </form>
        </Paper>
    );
}

export default LeagueSetup;