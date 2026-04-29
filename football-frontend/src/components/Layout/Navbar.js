import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: '#1b5e20' }}>
            <Toolbar>
                <SportsSoccerIcon sx={{ mr: 2 }} />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                    FOOTBALL MANAGER
                </Typography>
                <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon />}>
                    ΕΞΟΔΟΣ
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;