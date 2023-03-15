import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { OrderType } from '../../types/order';
import { getBetweenTwoDates } from '../../utils/analytics/time';
import { Period } from '../../types/analytics';
import useOrder from './../../hooks/useOrder';
import { getSalesData } from './../../utils/analytics/orderedData';
import { CartItemType } from '../../types/cart';

const initialOption: ApexOptions = {
    chart: {
        // height: 300,
        // width: 800,
        // height: 400,
        type: 'line',
    },
    stroke: {
        width: [0, 4],
    },
    title: {
        text: 'Sales by Day',
    },
    dataLabels: {
        enabled: true,
        enabledOnSeries: [1],
    },
    labels: [
        '01 Jan 2001',
        // `${new Date()}`,
        '02 Jan 2001',
        '03 Jan 2001',
        '04 Jan 2001',
        '05 Jan 2001',
        '06 Jan 2001',
        '07 Jan 2001',
        '08 Jan 2001',
        '09 Jan 2001',
        '10 Jan 2001',
        '11 Jan 2001',
        '12 Jan 2001',
    ],
    xaxis: {
        type: 'datetime',
        tickPlacement: 'between',
    },
    yaxis: [
        {
            title: {
                text: 'Selected Days',
            },
        },
        {
            opposite: true,
            title: {
                text: 'Average',
            },
        },
    ],
    responsive: [
        {
            breakpoint: 1000,
            options: {
                chart: {
                    width: 300,
                },
                legend: {
                    position: 'bottom',
                },
            },
        },
    ],
};

const initialSeries = [
    {
        name: 'Selected Days',
        type: 'column',
        data: [440, 505, 414, 671],
    },
    {
        name: 'Average',
        type: 'line',
        data: [23, 42, 35, 27],
    },
];

type Prop = {
    period?: Period;
    periodOrder?: OrderType[];
    cartItem?: CartItemType[];
};

export default function MixedChart({ period, periodOrder, cartItem }: Prop) {
    console.log(`period = ${JSON.stringify(period)}`);
    const [series, setSeries] = useState(initialSeries);
    const [option, setOption] = useState(initialOption);

    useEffect(() => {
        console.log('useEffect fired!');
        const dateRange = getBetweenTwoDates(period?.start!, period?.end!);
        // let salesData = dateRange.map((item) => 0);

        if (periodOrder && periodOrder!.length > 0) {
            const { salesData, average } = getSalesData(dateRange, periodOrder!, cartItem!);
            const newSeries = [
                { ...initialSeries[0], data: salesData },
                { ...initialSeries[1], data: average },
            ];
            setSeries(newSeries);
        }

        setOption((prev) => ({
            ...prev,
            labels: dateRange.map((item) => {
                item.setHours(9, 0, 0, 0);
                return item.toString();
            }),
        }));
    }, [periodOrder]);

    /*     useEffect(() => {
        setSeries((prev) => ({ ...prev, prev. }));
    }, [data]); */

    return (
        <div id="chart">
            <ReactApexChart options={option} series={series} type="line" width={600} />
        </div>
    );
}
