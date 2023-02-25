import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const initialSeries = [44, 55, 13, 43, 22];
const initialOptions: ApexOptions = {
    chart: {
        width: 380,
        type: 'pie',
    },
    labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
    responsive: [
        {
            breakpoint: 480,
            options: {
                chart: {
                    width: 200,
                },
                legend: {
                    position: 'bottom',
                },
            },
        },
    ],
};
export default function PieChart() {
    return (
        <div id="chart">
            <ReactApexChart options={initialOptions} series={initialSeries} type="pie" width={380} />
        </div>
    );
}
