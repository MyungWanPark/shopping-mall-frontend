import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { CartItemType } from '../../types/cart';
import { getPieChartData } from '../../utils/analytics/orderedData';
import { ProductType } from '../../types/product';
import { ANALYTICS_BOX_CLASS_NAME } from './../../pages/analytics/Analytics';

const initialSeries = [44, 55, 13];
const initialOptions: ApexOptions = {
    chart: {
        // width: '90%',
        type: 'pie',
        fontFamily: 'Raleway, sans-serif',
    },
    dataLabels: {
        enabled: true,
    },
    title: {
        text: 'Top 5 Item Sales Ratio',
        align: 'center',
        // offsetX: 30,
        offsetY: -5,
        style: {
            fontSize: '20px',
        },
    },
    tooltip: {
        y: {
            formatter: function (value) {
                return value.toLocaleString() + ' 원';
            },
        },
    },
    labels: ['Sample A', 'Sample B', 'Sample C'],
    responsive: [
        {
            breakpoint: 480,
            options: {
                /* chart: {
                    width: 200,
                }, */
                legend: {
                    position: 'bottom',
                },
            },
        },
    ],
};

type Prop = {
    data: {
        orderedCartItems?: CartItemType[];
        products?: ProductType[];
    };
};

export default function PieChart({ data: { orderedCartItems, products } }: Prop) {
    const [series, setSeries] = useState(initialSeries);
    const [option, setOption] = useState(initialOptions);

    useEffect(() => {
        if (orderedCartItems && orderedCartItems!.length > 0) {
            const salesData = getPieChartData(orderedCartItems!, products!);
            const newSeries = salesData.map((data) => data.salesAmount);
            const newLabels = salesData.map((data) => data.productName);
            setSeries(newSeries);
            setOption((prev) => ({
                ...prev,
                labels: newLabels,
            }));
        }
    }, [orderedCartItems]);

    return (
        <div id="chart" className={`${ANALYTICS_BOX_CLASS_NAME} p-6 flex justify-center items-center`}>
            <ReactApexChart options={option} series={series} type="pie" width={'150%'} />
        </div>
    );
}
