import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export function CustomChart({historyData, stationName}) {
    const values = historyData.values

    const data = {
        labels: values.map(value => new Date(value.date).getHours()),
        datasets: [
            {
                label: historyData.label,
                data: values.map(value => value.value),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: historyData.label + ' de la estación ' + stationName,
            },
        },
    };

    return <Line options={options} data={data} />;
}
