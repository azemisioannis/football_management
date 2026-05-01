import React, { useState } from 'react';
import { Paper, TextField, Button, Typography, Box } from '@mui/material';
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';

function TeamSetup({ onTeamCreated }) {
    const [teamData, setTeamData] = useState({
        name: '',
        city: ''
    });

    // Διαχείριση αλλαγών στα πεδία εισαγωγής της ομάδας
    const handleChange = (e) => {
        setTeamData({ ...teamData, [e.target.name]: e.target.value });
    };

    // Διαχείριση υποβολής της φόρμας και ενημέρωση του γονικού component
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Μελλοντική υλοποίηση κλήσης API για δημιουργία ομάδας
        console.log("Δεδομένα για το Table 'teams':", teamData);
        
        // Ενημέρωση Dashboard με προσωρινά δεδομένα (mock id)
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