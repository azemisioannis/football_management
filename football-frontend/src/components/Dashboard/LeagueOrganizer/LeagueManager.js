import React, { useState } from 'react';
import { Box, Typography, Paper, Button, Divider, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { deleteLeague, updateLeague } from '../../../services/api';
/**
 * Component για τη διαχείριση μιας συγκεκριμένης διοργάνωσης.
 * Παρέχει λειτουργίες προβολής, επεξεργασίας και διαγραφής.
 */
function LeagueManager({ league, onDelete }) {
    // Κατάσταση λειτουργίας (viewing ή editing)
    const [isEditing, setIsEditing] = useState(false);
    
    // Τοπικό state για την προσωρινή αποθήκευση των αλλαγών κατά την επεξεργασία
    const [editedLeague, setEditedLeague] = useState({
        name: league.Name || league.name,
        region: league.Region || league.region
    });

    // Ενημέρωση των πεδίων της φόρμας επεξεργασίας
    const handleChange = (e) => {
        setEditedLeague({ ...editedLeague, [e.target.name]: e.target.value });
    };

    /**
     * Διαγραφή της διοργάνωσης μετά από επιβεβαίωση του χρήστη.
     */
    const handleDelete = async () => {
        if (window.confirm(`Είστε σίγουροι ότι θέλετε να διαγράψετε τη λίγκα "${league.Name || league.name}";`)) {
            try {
                await deleteLeague(league.Id || league.id);
                onDelete(); // Ανανέωση της λίστας μετά τη διαγραφή
            } catch (error) {
                console.error("Delete Error:", error);
                alert("Σφάλμα κατά τη διαγραφή της διοργάνωσης.");
            }
        }
    };

    /**
     * Υποβολή των αλλαγών και ενημέρωση των δεδομένων στη βάση.
     */
   const handleSave = async () => {
    try {
        // Παίρνουμε το σωστό ID ανεξάρτητα αν είναι id ή Id
        const leagueId = league.id || league.Id; 
        
        // Στέλνουμε Name και Region με κεφαλαίο το πρώτο γράμμα
        await updateLeague(leagueId, {
            Name: editedLeague.name,
            Region: editedLeague.region
        });
        
        setIsEditing(false);
        onDelete(); // Καλεί τη fetchLeagues στο Dashboard για να ανανεωθεί η λίστα
    } catch (error) {
        console.error("Update Error:", error);
        alert("Σφάλμα κατά την αποθήκευση της διοργάνωσης.");
    }
};

    return (
        <Paper elevation={2} sx={{ p: 3, mb: 2, borderRadius: 2, borderLeft: '6px solid #1b5e20' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ flexGrow: 1, mr: 2 }}>
                    {isEditing ? (
                        /* Περιβάλλον Επεξεργασίας */
                        <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                            <TextField
                                label="Όνομα Διοργάνωσης"
                                name="name"
                                size="small"
                                value={editedLeague.name}
                                onChange={handleChange}
                                fullWidth
                                autoFocus
                            />
                            <TextField
                                label="Περιοχή / Έδρα"
                                name="region"
                                size="small"
                                value={editedLeague.region}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Box>
                    ) : (
                        /* Περιβάλλον Προβολής */
                        <>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1b5e20' }}>
                                {league.Name || league.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Περιοχή: {league.Region || league.region}
                            </Typography>
                        </>
                    )}
                </Box>

                {/* Δυναμική εναλλαγή κουμπιών βάσει κατάστασης επεξεργασίας */}
                <Box sx={{ display: 'flex', gap: 1 }}>
                    {isEditing ? (
                        <>
                            <Button 
                                variant="contained" 
                                color="success" 
                                startIcon={<SaveIcon />}
                                onClick={handleSave}
                                size="small"
                            >
                                Αποθήκευση
                            </Button>
                            <Button 
                                variant="outlined" 
                                color="inherit" 
                                startIcon={<CancelIcon />}
                                onClick={() => setIsEditing(false)}
                                size="small"
                            >
                                Άκυρο
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button 
                                variant="outlined" 
                                color="primary" 
                                startIcon={<EditIcon />}
                                onClick={() => setIsEditing(true)}
                                size="small"
                            >
                                Επεξεργασία
                            </Button>
                            <Button 
                                variant="outlined" 
                                color="error" 
                                startIcon={<DeleteIcon />}
                                onClick={handleDelete}
                                size="small"
                            >
                                Διαγραφή
                            </Button>
                        </>
                    )}
                </Box>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#666' }}>
                    Εγγεγραμμένες ομάδες: 0
                </Typography>
                {/* Μελλοντική προσθήκη ημερομηνίας ή status */}
            </Box>
        </Paper>
    );
}

export default LeagueManager;