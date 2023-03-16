import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { InflowRouteType } from '../../types/user';

type Props = {
    inflowType?: InflowRouteType;
    value?: number;
};

export default function InflowRoute({ inflowType, value }: Props) {
    console.log(`value = ${value}`);
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
                    image: inflowType
                        ? `${process.env.PUBLIC_URL}/images/inflowRoutes/logo/${inflowType}_logo.png`
                        : `${process.env.PUBLIC_URL}/images/banner.jpg`,
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
                src: [
                    inflowType
                        ? `${process.env.PUBLIC_URL}/images/inflowRoutes/bg/${inflowType}_bg.jpg`
                        : `${process.env.PUBLIC_URL}/images/banner2.jpg`,
                ],
            },
        },
        stroke: {
            lineCap: 'round',
        },
        labels: ['Volatility'],
    };

    /*     const initialSeries = [70];
    let newOption; */

    return (
        <div id="chart">
            <ReactApexChart options={initialOptions} series={value ? [value] : [0]} type="radialBar" height={350} />
        </div>
    );
}
