import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';
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
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
);
const changeTimeFormat = (hours, minutes) => {

    // Check whether AM or PM
    let newformat = hours >= 12 ? 'PM' : 'AM';

    // Find current hour in AM-PM Format
    hours = hours % 12;

    // To display "0" as "12"
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '' + minutes : minutes;

    return hours + ' ' + newformat;
}

const LineChart = ({ currentWeather3hrData, updateCurrentData }) => {
    const options = {
        responsive: true,
        onClick: (e, elements) => {
            updateCurrentData(currentWeather3hrData[elements[0].index]);
        },
        plugins: {
            datalabels: {
                borderRadius: 20,
                color: 'red',
                font: {
                    weight: 'bold'
                },
                formatter: Math.round,
                padding: 4
            },
            legend: {
                display: false //This will do the task
            },
        },
        scales: {
            y: {
                display: false,
                stacked: true,
                min: -10,
                max: 100,
                grid: {
                    display: false
                },
            },
            x: {
                display: true,
                grid: {
                    display: false
                }
            },
        }
    };
    const data = {
        labels: currentWeather3hrData.map((data) =>
            changeTimeFormat(data.dt_txt.split(" ")[1].split(":")[0], data.dt_txt.split(" ")[1].split(":")[1])
        ),
        datasets: [{
            label: "Weather for every 3 hour of the Day",
            data: currentWeather3hrData.map((data) => Math.round(data.main.temp)),
            datalabels: {
                align: 'end',
                anchor: 'end'
            },
            backgroundColor: "rgba(250, 0, 0, 1)",
            borderColor: "rgba(200, 0, 0, 1)",
            fill: true,
        }],
    };

    return (
        <>
            <Line data={data} options={options} width={'340px'}/>
        </>
    );
};

export default LineChart;
