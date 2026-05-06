import React from 'react';
import { TableRow, TableCell, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

/**
 * Component για την αναπαράσταση μιας γραμμής παίκτη στον πίνακα.
 */
const PlayerRow = ({ player, onDelete }) => {
    return (
        <TableRow hover>
            <TableCell>
                {`${player.firstName || player.first_name} ${player.lastName || player.last_name}`}
            </TableCell>
            <TableCell>
                {player.position || player.Position}
            </TableCell>
            <TableCell align="right">
                <IconButton 
                    color="error" 
                    onClick={() => onDelete(player.id || player.Id)}
                    size="small"
                >
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    );
};

export default PlayerRow;