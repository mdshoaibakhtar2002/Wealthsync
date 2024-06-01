import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Grid } from '@mui/material';

// Register the necessary components in ChartJS
ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    LineElement,
    Title,
    Tooltip,
    Legend
);

// Your data and configuration
const DATA_COUNT = 12;
const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };

// Sample Utils object to simulate your Utils functions
const Utils = {
    months: (config) => ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    numbers: (config) => Array.from({ length: config.count }, () => Math.floor(Math.random() * (config.max - config.min + 1)) + config.min),
    CHART_COLORS: {
        red: 'rgba(255, 66, 107)',
        blue: 'rgba(63, 145, 217)',
        ok: 'rgba(172, 230, 131)'
    },
    transparentize: (color, opacity) => {
        const alpha = 1 - opacity;
        return color.replace('1)', `${alpha})`);
    }
};

const labels = Utils.months({ count: 12 });
const data = {
    labels: labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: Utils.numbers(NUMBER_CFG),
            borderColor: Utils.CHART_COLORS.red,
            backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
            stack: 'Stack 0',
            type: 'bar',
        },
        {
            label: 'Dataset 2',
            data: Utils.numbers(NUMBER_CFG),
            borderColor: Utils.CHART_COLORS.blue,
            backgroundColor: Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),
            stack: 'Stack 2',
        },
        {
            label: 'Dataset 3',
            data: Utils.numbers(NUMBER_CFG),
            borderColor: Utils.CHART_COLORS.ok,
            backgroundColor: Utils.transparentize(Utils.CHART_COLORS.ok, 0.5),
            stack: 'Stack 1',
        }
    ]
};

const Graph = ({open}) => {
    return (
        <Grid container key={+open}>
                <Bar key={+open} style={{ height: '100%', width:'100%'}} data={data} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Combined Chart' } } }} />
        </Grid>
    );
};

export default Graph;
