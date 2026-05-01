import React from 'react';
import { 
    TextField, Button, Box, Typography, Link, InputAdornment 
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

// Εισαγωγή εικονιδίων για τα πεδία εισαγωγής
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import PersonIcon from '@mui/icons-material/Person';

const LoginForm = ({ formData, handleChange, handleLogin }) => {
    return (
        <Box component="form" onSubmit={handleLogin}>
            <Typography variant="h5" align="center" sx={{ fontWeight: 600, color: '#1b5e20', mb: 3 }}>
                Καλώς ήρθατε
            </Typography>

            {/* Πεδίο εισαγωγής ονόματος χρήστη με εικονίδιο */}
            <TextField
                margin="dense" 
                required 
                fullWidth 
                label="Όνομα Χρήστη"
                name="username"
                value={formData.username}
                onChange={handleChange}
                sx={{ mb: 2 }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <PersonIcon sx={{ color: '#1b5e20' }} />
                        </InputAdornment>
                    ),
                }}
            />

            {/* Πεδίο εισαγωγής κωδικού πρόσβασης */}
            <TextField
                margin="dense" 
                required 
                fullWidth 
                label="Κωδικός"
                name="password" 
                type="password"
                value={formData.password}
                onChange={handleChange}
                sx={{ mb: 2 }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <VpnKeyIcon sx={{ color: '#1b5e20' }} />
                        </InputAdornment>
                    ),
                }}
            />

            <Button
                type="submit" 
                fullWidth 
                variant="contained" 
                color="success" 
                sx={{ 
                    mt: 2, mb: 2, py: 1.8, 
                    fontWeight: 'bold', 
                    borderRadius: 4,
                    boxShadow: '0px 4px 15px rgba(46, 125, 50, 0.3)'
                }}
            >
                ΕΙΣΟΔΟΣ
            </Button>

            {/* Σύνδεσμος προς τη σελίδα εγγραφής νέου χρήστη */}
            <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Typography variant="body2" sx={{ color: '#555' }}>
                    Δεν έχετε λογαριασμό;{" "}
                    <Link 
                        component={RouterLink} 
                        to="/register" 
                        underline="hover" 
                        sx={{ fontWeight: 'bold', color: '#1b5e20' }}
                    >
                        Εγγραφείτε εδώ
                    </Link>
                </Typography>
            </Box>
        </Box>
    );
};

export default LoginForm;