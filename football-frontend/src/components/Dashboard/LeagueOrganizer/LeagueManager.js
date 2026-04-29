import React from 'react';
import { Box, Typography, Paper, Button, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteLeague } from '../../../services/api';

function LeagueManager({ league, onDelete }) {
    const handleDelete = async () => {
        if (window.confirm(`Είστε σίγουροι ότι θέλετε να διαγράψετε τη λίγκα "${league.Name || league.name}";`)) {
            try {
                await deleteLeague(league.Id || league.id);
                onDelete(); // Καλεί την ανανέωση της λίστας στο Dashboard
            } catch (error) {
                console.error("Delete Error:", error);
                alert("Σφάλμα κατά τη διαγραφή.");
            }
        }
    };

    return (
        <Paper elevation={2} sx={{ p: 3, mb: 2, borderRadius: 2, borderLeft: '6px solid #1b5e20' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {league.Name || league.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Περιοχή: {league.Region || league.region}
                    </Typography>
                </Box>
                <Button 
                    variant="outlined" 
                    color="error" 
                    startIcon={<DeleteIcon />}
                    onClick={handleDelete}
                >
                    Διαγραφή
                </Button>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#666' }}>
                Εγγεγραμμένες ομάδες: 0
            </Typography>
        </Paper>
    );
}

export default LeagueManager;