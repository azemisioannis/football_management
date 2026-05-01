import React, { useState } from 'react';
import { Box, Container, Paper, TextField, Button, Typography, Link, InputAdornment } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { login } from '../../services/api';
import { jwtDecode } from 'jwt-decode';
import backgroundImage from '../../Assets/football-field.jpg'; 
import LoginHeader from './LoginHeader';
import PersonIcon from '@mui/icons-material/Person';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Διαδικασία υποβολής της φόρμας και αυθεντικοποίησης χρήστη
    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginData = { UserName: username, Password: password };

        try {
            // Κλήση API για σύνδεση και αποθήκευση του token
            const response = await login(loginData);
            const token = response.data.token;
            localStorage.setItem('token', token);

            // Αποκωδικοποίηση ρόλου χρήστη και ανακατεύθυνση στο Dashboard
            const decoded = jwtDecode(token);
            const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
            localStorage.setItem('role', role);

            navigate('/dashboard');
        } catch (error) {
            console.error("Login Error:", error);
            alert("Λάθος στοιχεία σύνδεσης.");
        }
    };

    return (
        <Box sx={{ 
            minHeight: '100vh', display: 'flex', flexDirection: 'column', 
            alignItems: 'center', justifyContent: 'center',
            backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            // Overlay για τη βελτίωση της αναγνωσιμότητας πάνω από το background
            "&::before": { 
                content: '""', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
                backgroundColor: 'rgba(255, 255, 255, 0.85)', zIndex: 1 
            }
        }}>
            <LoginHeader />
            <Container maxWidth="xs" sx={{ zIndex: 2 }}>
                <Paper elevation={15} sx={{ p: 5, borderRadius: 5, display: 'flex', flexDirection: 'column' }}>
                    <Typography component="h1" variant="h5" align="center" sx={{ fontWeight: 600, color: '#1b5e20', mb: 3 }}>
                        Σύνδεση
                    </Typography>
                    
                    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                        <TextField
                            margin="normal" required fullWidth label="Όνομα Χρήστη"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonIcon sx={{ color: '#1b5e20' }} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            margin="normal" required fullWidth label="Κωδικός"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <VpnKeyIcon sx={{ color: '#1b5e20' }} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Button
                            type="submit" fullWidth variant="contained"
                            sx={{ mt: 4, mb: 2, py: 1.8, bgcolor: '#1b5e20', '&:hover': { bgcolor: '#144316' }, fontWeight: 'bold', borderRadius: 4 }}
                        >
                            ΣΥΝΔΕΣΗ
                        </Button>

                        {/* Σύνδεσμος εγγραφής νέου μέλους */}
                        <Box sx={{ textAlign: 'center', mt: 2 }}>
                            <Typography variant="body2" sx={{ color: '#555' }}>
                                Δεν έχετε λογαριασμό;{" "}
                                <Link component={RouterLink} to="/register" underline="hover" sx={{ fontWeight: 'bold', color: '#1b5e20' }}>
                                    Εγγραφείτε εδώ
                                </Link>
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
}

export default Login;