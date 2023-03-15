import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { OrderType } from '../../types/order';
import { CartItemType } from '../../types/cart';
import { getPieChartData } from '../../utils/analytics/orderedData';
import { ProductType } from '../../types/product';

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

type Prop = {
    data: {
        periodOrders?: OrderType[];
        orderedCartItems?: CartItemType[];
        products?: ProductType[];
    };
};

export default function PieChart({ data: { periodOrders, orderedCartItems, products } }: Prop) {
    const [series, setSeries] = useState(initialSeries);
    const [option, setOption] = useState(initialOptions);
    console.log(`orderedCartItems in PieChart = ${JSON.stringify(orderedCartItems)}`);

    useEffect(() => {
        if (periodOrders && periodOrders!.length > 0) {
            const salesData = getPieChartData(periodOrders!, orderedCartItems!, products!);
            // const newSeries = salesData.values;
            // setSeries(newSeries);
        }

        setOption((prev) => ({
            ...prev,
            // labels: salesData.labels
        }));
    }, [periodOrders]);

    return (
        <div id="chart">
            <ReactApexChart options={option} series={series} type="pie" width={380} />
        </div>
    );
}
