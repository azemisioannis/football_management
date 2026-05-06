import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import { jwtDecode } from 'jwt-decode';

function Navbar({ onLogout }) {
    const token = localStorage.getItem('token');
    const roleLabel = token ? 
        (jwtDecode(token)["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] === 'league_organizer' ? 'Organizer' : 'Team Manager') 
        : '';

    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: '#1b5e20' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <SportsSoccerIcon />
                    <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold', letterSpacing: 1 }}>
                        FOOTBALL MANAGER <span style={{ fontWeight: 300, fontSize: '0.8rem', marginLeft: '10px', opacity: 0.8 }}>| {roleLabel}</span>
                    </Typography>
                </Box>
                
                <Button 
                    color="inherit" 
                    onClick={onLogout} 
                    startIcon={<ExitToAppIcon />}
                    sx={{ textTransform: 'none', fontWeight: 'bold' }}
                >
                    Αποσύνδεση
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;