import React from 'react';
import { Typography, ToggleButtonGroup, ToggleButton } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const RoleSelector = ({ value, onChange }) => {
    return (
        <>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 'bold', color: '#555', textAlign: 'center' }}>
                ΕΓΓΡΑΦΗ ΩΣ:
            </Typography>
            <ToggleButtonGroup
                value={value}
                exclusive
                onChange={onChange}
                fullWidth
                color="success"
                sx={{ mb: 3, '& .MuiToggleButton-root': { py: 1.5, borderRadius: 2 } }}
            >
                <ToggleButton value="team_manager" sx={{ gap: 1 }}>
                    <GroupsIcon /> ΟΜΑΔΑ
                </ToggleButton>
                <ToggleButton value="league_organizer" sx={{ gap: 1 }}>
                    <EmojiEventsIcon /> ΛΙΓΚΑ
                </ToggleButton>
            </ToggleButtonGroup>
        </>
    );
};

export default RoleSelector;