import React from 'react';
import { ANALYTICS_GRID_CLASS_NAME } from '../../pages/analytics/Analytics';
import { User } from '../../types/user';
import { getInflowRouteData } from '../../utils/analytics/orderedData';
import InflowRoute from './InflowRoute';

type Prop = {
    data: {
        userInfos?: User[];
    };
};
/*
    -- 순서 --

1. instagram
2. facebook
3. 직접검색
4. 기타

*/

const defaultGradientOption = {
    colors: ['#f602b2ff'],
    type: 'gradient',
    gradient: {
        shade: 'dark',
        type: 'horizontal',
        gradientToColors: ['#f5bd02ff'],
        shadeIntensity: 0.5,
        inverseColors: true,
        opacityFrom: 0.5,
        opacityTo: 1,
        stops: [0, 100],
    },
};

function getInflowRatio(routeNum: number, total: number) {
    return Math.round((routeNum / total) * 100);
}

export default function InflowRoutes({ data: { userInfos } }: Prop) {
    let inflowRoutes;
    let totalSum;

    if (userInfos && userInfos.length > 0) {
        const { inflowInfo, totalNum } = getInflowRouteData(userInfos);
        inflowRoutes = inflowInfo;
        totalSum = totalNum;
    }

    return (
        <div className={`${ANALYTICS_GRID_CLASS_NAME} md:grid-cols-4`}>
            <InflowRoute
                value={{
                    percent: inflowRoutes && totalSum ? getInflowRatio(inflowRoutes.instagram, totalSum) : 0,
                    number: inflowRoutes && totalSum ? inflowRoutes.instagram : 0,
                }}
                chartStyle={{
                    title: 'Instagram',
                    color: {
                        ...defaultGradientOption,
                    },
                    iconColor: 'text-rose-400',
                }}
            />
            <InflowRoute
                value={{
                    percent: inflowRoutes && totalSum ? getInflowRatio(inflowRoutes.facebook, totalSum) : 0,
                    number: inflowRoutes && totalSum ? inflowRoutes.facebook : 0,
                }}
                chartStyle={{
                    title: 'Facebook',
                    color: {
                        ...defaultGradientOption,
                        colors: ['#0470e5ff'],
                        gradient: { ...defaultGradientOption.gradient, gradientToColors: ['#ffffff'] },
                    },
                    iconColor: 'text-blue-500',
                }}
            />
            <InflowRoute
                value={{
                    percent: inflowRoutes && totalSum ? getInflowRatio(inflowRoutes.directSearch, totalSum) : 0,
                    number: inflowRoutes && totalSum ? inflowRoutes.directSearch : 0,
                }}
                chartStyle={{
                    title: '직접 검색',
                    color: {
                        ...defaultGradientOption,
                        colors: ['#16A34A'],
                        gradient: {
                            ...defaultGradientOption.gradient,
                            gradientToColors: ['#ffffff'],
                        },
                    },
                    iconColor: 'text-emerald-500',
                }}
            />
            <InflowRoute
                value={{
                    percent: inflowRoutes && totalSum ? getInflowRatio(inflowRoutes.etc, totalSum) : 0,
                    number: inflowRoutes && totalSum ? inflowRoutes.etc : 0,
                }}
                chartStyle={{
                    title: '기타',
                    color: {
                        ...defaultGradientOption,
                        colors: ['#64748B'],
                        gradient: { ...defaultGradientOption.gradient, gradientToColors: ['#ffffff'] },
                    },
                    iconColor: 'text-gray-500',
                }}
            />
        </div>
    );
}
