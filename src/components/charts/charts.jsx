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
import {Button} from "react-bootstrap";
import {transformToCsv} from "../../services/jsonToCsvConverter";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export function CustomChart({historyData, stationName, parameter, time}) {
    const handleDownloadData = () => {
        const fileName = `${stationName} - ${parameter} by ${time}.csv`;
        console.log(historyData.values)
        const csv = transformToCsv(historyData.values);
        if (window.navigator.msSaveOrOpenBlob) {
            const blob = new Blob([csv]);
            window.navigator.msSaveOrOpenBlob(blob, fileName);
        } else {
            const a = document.createElement('a');
            a.href = 'data:attachment/csv,' +  encodeURIComponent(csv);
            a.target = '_blank';
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
        }
    }


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

    return <>
        <Line options={options} data={data} />
        <Button onClick={handleDownloadData}>Descargar como CSV</Button>
    </>;
}
