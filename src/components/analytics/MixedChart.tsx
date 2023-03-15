import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { OrderType } from '../../types/order';
import { getBetweenTwoDates } from '../../utils/analytics/time';
import { Period } from '../../types/analytics';
import useOrder from './../../hooks/useOrder';
import { getLineChartData } from './../../utils/analytics/orderedData';
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
    labels: ['01 Jan 2001', '02 Jan 2001', '03 Jan 2001', '04 Jan 2001'],
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
    data: {
        period?: Period;
        periodOrders?: OrderType[];
        orderedCartItems?: CartItemType[];
    };
};

export default function MixedChart({ data: { period, periodOrders, orderedCartItems } }: Prop) {
    const [series, setSeries] = useState(initialSeries);
    const [option, setOption] = useState(initialOption);
    // console.log(`orderedCartItems first in mixed = ${JSON.stringify(orderedCartItems)}`);
    useEffect(() => {
        const dateRange = getBetweenTwoDates(period?.start!, period?.end!);

        if (periodOrders && periodOrders!.length > 0) {
            console.log(`getLineChartData in useEffect fired`);
            console.log(`dateRange = ${JSON.stringify(dateRange)}`);
            console.log(`periodOrders = ${JSON.stringify(periodOrders)}`);
            console.log(`orderedCartItems = ${JSON.stringify(orderedCartItems)}`);

            const { salesData, average } = getLineChartData(dateRange, periodOrders!, orderedCartItems!);
            const newSeries = [
                { ...initialSeries[0], data: salesData },
                { ...initialSeries[1], data: average },
            ];
            setSeries(newSeries);
        }

        setOption((prev) => ({
            ...prev,
            labels: dateRange.map((item) => {
                const date = new Date(item);
                date.setHours(9, 0, 0, 0);
                return date.toString();
            }),
        }));
    }, [periodOrders]);

    return (
        <div id="chart">
            <ReactApexChart options={option} series={series} type="line" width={600} />
        </div>
    );
}
