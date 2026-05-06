import React from 'react';
import { 
    Drawer, List, ListItem, ListItemButton, ListItemIcon, 
    ListItemText, Toolbar, Divider, Box 
} from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import GroupsIcon from '@mui/icons-material/Groups';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';

const drawerWidth = 260;

function Sidebar({ setView, currentView }) {
    // Ανάκτηση του ρόλου από το token
    const token = localStorage.getItem('token');
    let userRole = '';
    
    if (token) {
        try {
            const decoded = jwtDecode(token);
            userRole = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        } catch (error) {
            console.error("Invalid token in Sidebar");
        }
    }

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
            <Toolbar />
            <Divider />
            <List sx={{ mt: 1 }}>
                
                {/* --- ΕΠΙΛΟΓΕΣ ΓΙΑ LEAGUE ORGANIZER --- */}
                {userRole === 'league_organizer' && (
                    <>
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
                    </>
                )}

                {/* --- ΕΠΙΛΟΓΕΣ ΓΙΑ TEAM MANAGER --- */}
                {userRole === 'team_manager' && (
                    <>
                        <ListItem disablePadding>
                            <ListItemButton 
                                onClick={() => setView('my_teams')} 
                                selected={currentView === 'my_teams' || currentView === 'manage_roster'}
                            >
                                <ListItemIcon>
                                    <GroupsIcon sx={{ color: (currentView === 'my_teams' || currentView === 'manage_roster') ? '#1b5e20' : '#757575' }} />
                                </ListItemIcon>
                                <ListItemText primary="Οι Ομάδες μου" />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton 
                                onClick={() => setView('add_team')} 
                                selected={currentView === 'add_team'}
                            >
                                <ListItemIcon>
                                    <AddBusinessIcon sx={{ color: currentView === 'add_team' ? '#1b5e20' : '#757575' }} />
                                </ListItemIcon>
                                <ListItemText primary="Προσθήκη Ομάδας" />
                            </ListItemButton>
                        </ListItem>
                    </>
                )}

            </List>
        </Drawer>
    );
}

export default Sidebar;