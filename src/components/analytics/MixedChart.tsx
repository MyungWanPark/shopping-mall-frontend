import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { OrderType } from '../../types/order';
import { getBetweenTwoDates } from '../../utils/analytics/time';
import { Period } from '../../types/analytics';
// import useOrder from './../../hooks/useOrder';
import { getLineChartData } from './../../utils/analytics/orderedData';
import { CartItemType } from '../../types/cart';
import { ANALYTICS_BOX_CLASS_NAME } from './../../pages/analytics/Analytics';

const initialOption: ApexOptions = {
    chart: {
        // height: 300,
        // width: 800,
        // height: 400,
        type: 'line',
        toolbar: {
            offsetX: -30,
            offsetY: 0,
            // show: false,
        },
        fontFamily: 'Raleway, sans-serif',
    },
    stroke: {
        width: [0, 4],
    },
    title: {
        text: 'Sales by Day',
        style: {
            fontSize: '20px',
        },
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
            labels: {
                formatter: function (value) {
                    return Math.round(value).toLocaleString() + ' 원';
                },
            },
        },
        {
            opposite: true,
            title: {
                text: 'Average',
            },
            labels: {
                formatter: function (value) {
                    return Math.round(value).toLocaleString() + ' 원';
                },
            },
        },
    ],
    responsive: [
        {
            breakpoint: 300,
            options: {
                chart: {
                    width: 300,
                    toolbar: {
                        show: false,
                    },
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

    useEffect(() => {
        const dateRange = getBetweenTwoDates(period?.start!, period?.end!);

        if (orderedCartItems && periodOrders && periodOrders!.length > 0) {
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
                // const date = new Date(item);
                item.setHours(9, 0, 0, 0);
                return item.toString();
            }),
        }));
    }, [periodOrders, orderedCartItems]);

    return (
        <div id="mixedChart" className={`${ANALYTICS_BOX_CLASS_NAME} justify-center items-center p-6`}>
            <ReactApexChart options={option} series={series} type="line" width={'100%'} />
        </div>
    );
}
