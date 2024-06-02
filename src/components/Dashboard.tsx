import { Stack } from '@mui/material';
import Graph from './table/Graph';
import { useContext } from 'react';
import { AppContext } from '../AppContext';

const Dashboard = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('AppContext must be used within an AppProvider');
    }
    const { graphData, open } = context;

    return (
        <Stack sx={open ? { width: '85%', marginLeft: '14rem' } : { width: '100%' }}>
            <Graph cashInArray={graphData['cashInArray']} cashOutArray={graphData['cashOutArray']} liquidFunds={graphData['cashBox']} />
        </Stack>
    )
}

export default Dashboard