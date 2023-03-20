import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { ANALYTICS_BOX_CLASS_NAME } from './../../pages/analytics/Analytics';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';

type GradientColor = {
    colors: string[];
    type: 'gradient';
    gradient: {
        shade: string;
        type?: string;
        shadeIntensity: number;
        gradientToColors: string[];
        inverseColors?: boolean;
        opacityFrom: number;
        opacityTo: number;
        stops?: number[];
    };
};

type SimpleColor = {
    colors: string[];
};

type Props = {
    chartStyle: {
        title: string;
        color: GradientColor | SimpleColor;
        iconColor: string;
    };
    value?: {
        percent: number;
        number: number;
    };
};

export default function InflowRoute({ chartStyle, value }: Props) {
    const initialOptions: ApexOptions = {
        chart: {
            height: 350,
            type: 'radialBar',
            fontFamily: 'Raleway, sans-serif',
        },
        /* title: {
            text: `${chartStyle.title}`,
        }, */
        responsive: [
            {
                breakpoint: 768,
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
        plotOptions: {
            radialBar: {
                hollow: {
                    size: '70%',
                },
                dataLabels: {
                    // show: true,
                    name: {
                        // offsetY: -10,
                        // show: true,
                        color: chartStyle.color.colors[0],
                        fontSize: '17px',
                    },
                    value: {
                        color: chartStyle.color.colors[0],
                        fontSize: '20px',
                        // show: true,
                    },
                },
            },
        },
        stroke: {
            lineCap: 'round',
        },
        labels: [chartStyle.title],
        fill: chartStyle.color,
    };

    /*     const initialSeries = [70];
    let newOption; */

    return (
        <div id="inflowChart" className={`${ANALYTICS_BOX_CLASS_NAME} pt-3`}>
            <div className={`flex justify-center items-center text-md ${chartStyle.iconColor}`}>
                <AiOutlineUsergroupAdd className="text-xl" />
                <span> {value?.number} 명</span>
            </div>
            <ReactApexChart options={initialOptions} series={value?.percent ? [value.percent] : [0]} type="radialBar" />
        </div>
    );
}
