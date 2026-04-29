import React, { useState } from 'react';
import { Paper, TextField, Button, Typography, Box } from '@mui/material';
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';

function TeamSetup({ onTeamCreated }) {
    const [teamData, setTeamData] = useState({
        name: '',
        city: ''
    });

    const handleChange = (e) => {
        setTeamData({ ...teamData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Εδώ θα μπει η κλήση στο API αργότερα:
        // const response = await createTeam(teamData);
        
        console.log("Δεδομένα για το Table 'teams':", teamData);
        
        // Ειδοποιούμε τον "πατέρα" (Dashboard) ότι η ομάδα φτιάχτηκε
        // Του στέλνουμε ένα mock id για να ξεκλειδώσει το PlayerManager
        onTeamCreated({ id: 99, ...teamData }); 
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 4, maxWidth: 400, width: '100%' }}>
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <AddHomeWorkIcon sx={{ fontSize: 50, color: '#1b5e20', mb: 1 }} />
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333' }}>
                        Δημιουργία Ομάδας
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Πρέπει να φτιάξετε μια ομάδα για να προσθέσετε παίκτες.
                    </Typography>
                </Box>

                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Όνομα Ομάδας"
                        name="name"
                        variant="outlined"
                        value={teamData.name}
                        onChange={handleChange}
                        required
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Πόλη"
                        name="city"
                        variant="outlined"
                        value={teamData.city}
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
                        ΔΗΜΙΟΥΡΓΙΑ & ΣΥΝΕΧΕΙΑ
                    </Button>
                </form>
            </Paper>
        </Box>
    );
}

export default TeamSetup;