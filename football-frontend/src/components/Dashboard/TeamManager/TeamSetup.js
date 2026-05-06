import React, { useState } from 'react';
import { Paper, TextField, Button, Typography, Box } from '@mui/material';
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import { jwtDecode } from 'jwt-decode';
import API from '../../../services/api';

function TeamSetup({ onTeamCreated }) {
    const [teamData, setTeamData] = useState({ name: '', city: '' });

    const handleChange = (e) => {
        setTeamData({ ...teamData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const decoded = jwtDecode(token);
            
            const payload = {
                Name: teamData.name,
                City: teamData.city,
                UserId: decoded.userId,
                LeagueId: null 
            };

            const response = await API.post('/team', payload);
            onTeamCreated(response.data); 
        } catch (error) {
            console.error("Error creating team:", error);
            alert("Σφάλμα κατά τη δημιουργία της ομάδας.");
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 4, maxWidth: 400, width: '100%' }}>
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <AddHomeWorkIcon sx={{ fontSize: 50, color: '#1b5e20', mb: 1 }} />
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Δημιουργία Ομάδας</Typography>
                </Box>
                <form onSubmit={handleSubmit}>
                    <TextField fullWidth label="Όνομα Ομάδας" name="name" value={teamData.name} onChange={handleChange} required sx={{ mb: 2 }} />
                    <TextField fullWidth label="Πόλη" name="city" value={teamData.city} onChange={handleChange} required sx={{ mb: 3 }} />
                    <Button type="submit" fullWidth variant="contained" color="success" size="large">ΔΗΜΙΟΥΡΓΙΑ</Button>
                </form>
            </Paper>
        </Box>
    );
}

export default TeamSetup;