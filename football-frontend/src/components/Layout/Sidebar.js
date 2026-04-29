import React from 'react';
import { 
    Drawer, List, ListItem, ListItemButton, ListItemIcon, 
    ListItemText, Toolbar, Divider, Typography 
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const drawerWidth = 260;

function Sidebar({ setView, currentView }) {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { 
                    width: drawerWidth, 
                    boxSizing: 'border-box', 
                    bgcolor: '#f8f9fa',
                    borderRight: '1px solid #e0e0e0'
                },
            }}
        >
            <Toolbar /> {/* Κενό για να μην καλύπτεται από το Navbar */}
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton 
                        onClick={() => setView('my_leagues')} 
                        selected={currentView === 'my_leagues'}
                    >
                        <ListItemIcon>
                            <EmojiEventsIcon sx={{ color: currentView === 'my_leagues' ? '#1b5e20' : '#757575' }} />
                        </ListItemIcon>
                        <ListItemText primary="Οι Λίγκες μου" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton 
                        onClick={() => setView('add_league')} 
                        selected={currentView === 'add_league'}
                    >
                        <ListItemIcon>
                            <AddCircleIcon sx={{ color: currentView === 'add_league' ? '#1b5e20' : '#757575' }} />
                        </ListItemIcon>
                        <ListItemText primary="Προσθήκη Λίγκας" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    );
}

export default Sidebar;