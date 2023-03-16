import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const initialOptions: ApexOptions = {
    chart: {
        height: 350,
        type: 'radialBar',
    },
    plotOptions: {
        radialBar: {
            hollow: {
                margin: 15,
                size: '70%',
                image: `${process.env.PUBLIC_URL}/images/banner.jpg`,
                imageWidth: 64,
                imageHeight: 64,
                imageClipped: false,
            },
            dataLabels: {
                name: {
                    show: false,
                    color: '#fff',
                },
                value: {
                    show: true,
                    color: '#333',
                    offsetY: 70,
                    fontSize: '22px',
                },
            },
        },
    },
    fill: {
        type: 'image',
        image: {
            src: [`${process.env.PUBLIC_URL}/images/banner.jpg`],
        },
    },
    stroke: {
        lineCap: 'round',
    },
    labels: ['Volatility'],
};

const initialSeries = [70];

type Props = {
    imageURL?: string;
    value?: number;
};

export default function InflowRoute({ imageURL, value }: Props) {
    return (
        <div id="chart">
            <ReactApexChart options={initialOptions} series={initialSeries} type="radialBar" height={350} />
        </div>
    );
}
