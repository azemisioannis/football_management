import React from 'react';
import { Stack, Pagination } from '@mui/material';

function PaginationComponent({ count, page, onChange }) {
    if (count <= 1) return null;

    return (
        <Stack spacing={2} sx={{ mt: 4, alignItems: 'center' }}>
            <Pagination 
                count={count} 
                page={page} 
                onChange={onChange} 
                color="success" 
                size="large"
                showFirstButton 
                showLastButton
            />
        </Stack>
    );
}

export default PaginationComponent;