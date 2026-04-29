import React, { useState } from 'react';
import { TextField, Button, Typography, Paper, Box, Stack } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { jwtDecode } from 'jwt-decode'; // Χρειάζεται για το UserId
import API from '../../../services/api'; // Σιγουρέψου για το σωστό path

function LeagueSetup({ onLeagueCreated }) {
    const [leagueData, setLeagueData] = useState({ 
        name: '', 
        region: '' 
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLeagueData({ ...leagueData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // 1. Παίρνουμε το token και αποκωδικοποιούμε το UserId
            const token = localStorage.getItem('token');
            if (!token) return;
            
            const decoded = jwtDecode(token);
            const userId = decoded.userId;

            // 2. Προετοιμάζουμε το αντικείμενο για το Backend (προσέχουμε τα κεφαλαία/πεζά αν χρειάζεται)
            const finalData = {
                name: leagueData.name,
                region: leagueData.region,
                userId: userId
            };

            // 3. Στέλνουμε το POST request
            await API.post('/league', finalData);
            
            // 4. Ενημερώνουμε το Dashboard να κάνει refresh και να αλλάξει view
            onLeagueCreated(); 
            
        } catch (error) {
            console.error("Error creating league:", error);
            alert("Κάτι πήγε στραβά κατά τη δημιουργία της λίγκας.");
        }
    };

    return (
        <Paper elevation={4} sx={{ p: 4, mt: 5, borderRadius: 4, maxWidth: 500, mx: 'auto' }}>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
                <EmojiEventsIcon sx={{ fontSize: 60, color: '#fbc02d' }} />
                <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 1 }}>
                    Νέα Λίγκα
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Συμπληρώστε τα στοιχεία της διοργάνωσης
                </Typography>
            </Box>

            <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                    <TextField
                        fullWidth
                        label="Όνομα Λίγκας"
                        name="name"
                        value={leagueData.name}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Περιοχή (Region)"
                        name="region"
                        value={leagueData.region}
                        onChange={handleChange}
                        required
                    />
                    <Button 
                        type="submit" 
                        variant="contained" 
                        size="large"
                        sx={{ 
                            bgcolor: '#1b5e20', 
                            py: 1.5, 
                            fontWeight: 'bold',
                            '&:hover': { bgcolor: '#2e7d32' }
                        }}
                    >
                        ΔΗΜΙΟΥΡΓΙΑ
                    </Button>
                </Stack>
            </form>
        </Paper>
    );
}

export default LeagueSetup;