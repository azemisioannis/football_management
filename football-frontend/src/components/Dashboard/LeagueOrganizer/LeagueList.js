import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import LeagueManager from './LeagueManager';
import PaginationComponent from '../../Common/PaginationComponent';

function LeagueList({ leagues, onDelete, onViewTeams }) {
    const [page, setPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        const totalPages = Math.ceil(leagues.length / itemsPerPage);
        if (page > totalPages && totalPages > 0) {
            setPage(totalPages);
        }
    }, [leagues.length, page]);

    const handlePageChange = (event, value) => {
        setPage(value);
        window.scrollTo(0, 0);
    };

    const indexOfLastItem = page * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentLeagues = leagues.slice(indexOfFirstItem, indexOfLastItem);

    if (leagues.length === 0) {
        return (
            <Paper sx={{ p: 5, textAlign: 'center', bgcolor: '#fafafa', border: '1px dashed #ccc' }}>
                <Typography color="textSecondary">Δεν έχετε καταχωρίσει ακόμα κάποια λίγκα.</Typography>
            </Paper>
        );
    }

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: '#333' }}>
                Διαχείριση Διοργανώσεων
            </Typography>

            {currentLeagues.map((league) => (
                <LeagueManager key={league.Id || league.id} league={league} onDelete={onDelete} onViewTeams={onViewTeams} />
            ))}

            <PaginationComponent 
                count={Math.ceil(leagues.length / itemsPerPage)} 
                page={page} 
                onChange={handlePageChange} 
            />
        </Box>
    );
}

export default LeagueList;