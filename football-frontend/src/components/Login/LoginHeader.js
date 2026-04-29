import React from 'react';
import { Box, Typography } from '@mui/material';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';

const LoginHeader = () => {
    return (
        <Box sx={{ zIndex: 2, mb: 4, textAlign: 'center' }}>
            <Typography 
                variant="h2" 
                sx={{ 
                    fontWeight: 900, 
                    letterSpacing: '-1px', 
                    textTransform: 'uppercase', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: 2,
                    background: 'linear-gradient(45deg, #1b5e20 30%, #4caf50 90%)',
                    WebkitBackgroundClip: 'text', 
                    WebkitTextFillColor: 'transparent',
                    fontSize: { xs: '2.2rem', md: '4rem' },
                    // Το animation περιστροφής
                    '&:hover svg': { 
                        transform: 'rotate(360deg)', 
                        transition: '1s' 
                    }
                }}
            >
                <SportsSoccerIcon 
                    sx={{ 
                        fontSize: { xs: 40, md: 60 }, 
                        color: '#1b5e20', 
                        WebkitTextFillColor: 'initial' 
                    }} 
                />
                
                Football
                <Box 
                    component="span" 
                    sx={{ 
                        color: '#2e7d32', 
                        WebkitTextFillColor: 'initial', 
                        fontWeight: 300 
                    }}
                >
                    App
                </Box>

                <SportsSoccerIcon 
                    sx={{ 
                        fontSize: { xs: 40, md: 60 }, 
                        color: '#1b5e20', 
                        WebkitTextFillColor: 'initial' 
                    }} 
                />
            </Typography>

            {/* Η μικρή πράσινη γραμμή κάτω από τον τίτλο */}
            <Box 
                sx={{ 
                    width: '80px', 
                    height: '4px', 
                    backgroundColor: '#1b5e20', 
                    margin: '10px auto', 
                    borderRadius: '2px' 
                }} 
            />
        </Box>
    );
};

export default LoginHeader;