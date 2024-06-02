import { Stack, Typography } from '@mui/material';
import { AppContext } from '../../AppContext';
import { useContext } from 'react';

const Footer = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('AppContext must be used within an AppProvider');
    }
    const { open } = context;
    return (
        <Stack sx={open ? { width: '85%', marginLeft: '14rem' } : { width: '100%' }}>
            <Typography>© 2024 Wealthsync</Typography>
        </Stack>
    )
}

export default Footer;