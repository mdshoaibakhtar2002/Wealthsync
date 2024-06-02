import { Stack } from '@mui/material';
import Graph from './table/Graph';
import { useContext } from 'react';
import { AppContext } from '../AppContext';

const Dashboard = () => {
    const { graphData, open} = useContext(AppContext);
    return (
        <Stack sx={open ? {width:'85%', marginLeft:'14rem'}:{width:'100%'}}>
             <Graph open={true} cashInArray={graphData['cashInArray']} cashOutArray={graphData['cashOutArray']} liquidFunds={graphData['cashBox']}/>
        </Stack>
    )
}

export default Dashboard