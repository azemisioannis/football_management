import React from 'react';
import { TextField, Button, Box, Typography, Link, InputAdornment } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import RoleSelector from './RoleSelector';

const RegisterForm = ({ formData, handleChange, handleRoleChange, handleSubmit }) => {
    return (
        <Box component="form" onSubmit={handleSubmit}>
            <Typography variant="h5" align="center" sx={{ fontWeight: 600, color: '#1b5e20', mb: 3 }}>
                Δημιουργία Λογαριασμού
            </Typography>

            {/* Επιλογή ρόλου χρήστη (Manager ή Διοργανωτής) */}
            <RoleSelector value={formData.role} onChange={handleRoleChange} />

            <TextField
                margin="dense" required fullWidth label="Όνομα Χρήστη"
                name="username" value={formData.username} onChange={handleChange}
                sx={{ mb: 1 }}
                InputProps={{
                    startAdornment: (<InputAdornment position="start"><PersonIcon sx={{ color: '#1b5e20' }} /></InputAdornment>),
                }}
            />

            <TextField
                margin="dense" required fullWidth label="Email"
                name="email" type="email" value={formData.email} onChange={handleChange}
                sx={{ mb: 1 }}
                InputProps={{
                    startAdornment: (<InputAdornment position="start"><EmailIcon sx={{ color: '#1b5e20' }} /></InputAdornment>),
                }}
            />

            <TextField
                margin="dense" required fullWidth label="Κωδικός"
                name="password" type="password" value={formData.password} onChange={handleChange}
                sx={{ mb: 1 }}
                InputProps={{
                    startAdornment: (<InputAdornment position="start"><VpnKeyIcon sx={{ color: '#1b5e20' }} /></InputAdornment>),
                }}
            />

            <TextField
                margin="dense" required fullWidth label="Επιβεβαίωση Κωδικού"
                name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange}
                sx={{ mb: 2 }}
                InputProps={{
                    startAdornment: (<InputAdornment position="start"><VpnKeyIcon sx={{ color: '#1b5e20' }} /></InputAdornment>),
                }}
            />

            <Button
                type="submit" fullWidth variant="contained" color="success" 
                sx={{ mt: 2, mb: 2, py: 1.8, fontWeight: 'bold', borderRadius: 4 }}
            >
                ΟΛΟΚΛΗΡΩΣΗ ΕΓΓΡΑΦΗΣ
            </Button>

            {/* Πλοήγηση πίσω στη σελίδα σύνδεσης */}
            <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Typography variant="body2" sx={{ color: '#555' }}>
                    Έχετε ήδη λογαριασμό;{" "}
                    <Link component={RouterLink} to="/" underline="hover" sx={{ fontWeight: 'bold', color: '#1b5e20' }}>
                        Συνδεθείτε εδώ
                    </Link>
                </Typography>
            </Box>
        </Box>
    );
};

export default RegisterForm;