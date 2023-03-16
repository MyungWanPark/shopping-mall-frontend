import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { CartItemType } from '../../types/cart';
import { getPieChartData } from '../../utils/analytics/orderedData';
import { ProductType } from '../../types/product';

const initialSeries = [44, 55, 13];
const initialOptions: ApexOptions = {
    chart: {
        width: 380,
        type: 'pie',
    },
    labels: ['Team A', 'Team B', 'Team C'],
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

type Prop = {
    data: {
        orderedCartItems?: CartItemType[];
        products?: ProductType[];
    };
};

export default function PieChart({ data: { orderedCartItems, products } }: Prop) {
    const [series, setSeries] = useState(initialSeries);
    const [option, setOption] = useState(initialOptions);
    // console.log(`orderedCartItems in PieChart = ${JSON.stringify(orderedCartItems)}`);

    useEffect(() => {
        // console.log('useEffect fired in Piechart');
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
        <div id="chart">
            <ReactApexChart options={option} series={series} type="pie" width={380} />
        </div>
    );
}
