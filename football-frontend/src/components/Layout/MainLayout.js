import React from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const drawerWidth = 240;

function MainLayout({ children, role }) {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Navbar />
            <Sidebar role={role} />
            <Box 
                component="main" 
                sx={{ 
                    flexGrow: 1, 
                    p: 3, 
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    bgcolor: '#f0f2f5',
                    minHeight: '100vh'
                }}
            >
                <Toolbar /> {/* Απαραίτητο για να μην κρύβεται το περιεχόμενο κάτω από το Navbar */}
                {children}
            </Box>
        </Box>
    );
}

export default MainLayout;