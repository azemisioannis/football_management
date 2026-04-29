import React, { useState } from 'react';
import { Box, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/api'; 
import backgroundImage from '../../Assets/football-field.jpg'; 

import LoginHeader from '../Login/LoginHeader';
import RegisterForm from './RegisterForm';

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '', 
        email: '', 
        password: '', 
        confirmPassword: '', 
        role: 'team_manager'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRoleChange = (event, newRole) => {
        if (newRole !== null) setFormData({ ...formData, role: newRole });
    };

   const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
        alert("Οι κωδικοί δεν ταιριάζουν!");
        return;
    }

    // Αν η βάση σου περιμένει "league_organizer" αντί για "league",
    // στέλνουμε απευθείας το role από το state μας.
    const registerData = {
        UserName: formData.username,
        Password: formData.password,
        Role: formData.role // Εδώ θα στείλει "league_organizer" ή "team_manager"
    };

    try {
        await register(registerData);
        alert("Η εγγραφή έγινε επιτυχώς!");
        navigate('/');
    } catch (error) {
        // Εδώ τυπώνουμε το σφάλμα για να ξέρουμε τι φταίει
        console.error("Registration Error:", error.response?.data);
        alert(error.response?.data || "Σφάλμα στην εγγραφή.");
    }
};

    return (
        <Box sx={{ 
            minHeight: '100vh', display: 'flex', flexDirection: 'column', 
            alignItems: 'center', justifyContent: 'center',
            backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover',
            position: 'relative',
            "&::before": { 
                content: '""', 
                position: 'absolute', 
                top: 0, left: 0, right: 0, bottom: 0, 
                backgroundColor: 'rgba(255, 255, 255, 0.85)', 
                zIndex: 1 
            }
        }}>
            <LoginHeader />
            <Container maxWidth="xs" sx={{ zIndex: 2 }}>
                <Paper elevation={15} sx={{ padding: { xs: 3, md: 5 }, borderRadius: 5 }}>
                    <RegisterForm 
                        formData={formData}
                        handleChange={handleChange}
                        handleRoleChange={handleRoleChange}
                        handleSubmit={handleSubmit}
                    />
                </Paper>
            </Container>
        </Box>
    );
}

export default Register;