import React from 'react';
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
export default function InflowRoutes({ data: { userInfos } }: Prop) {
    let inflowRoutes;
    let totalSum;

    if (userInfos && userInfos.length > 0) {
        const { inflowInfo, totalNum } = getInflowRouteData(userInfos);
        inflowRoutes = inflowInfo;
        totalSum = totalNum;
    }

    return (
        <div className="grid grid-cols-4 gap-2">
            <InflowRoute
                value={inflowRoutes && totalSum ? Math.round((inflowRoutes.instagram / totalSum) * 100) : 0}
                inflowType={'instagram'}
            />
            <InflowRoute
                value={inflowRoutes && totalSum ? Math.round((inflowRoutes.facebook / totalSum) * 100) : 0}
                inflowType={'facebook'}
            />
            <InflowRoute
                value={inflowRoutes && totalSum ? Math.round((inflowRoutes.directSearch / totalSum) * 100) : 0}
                inflowType={'directSearch'}
            />
            <InflowRoute
                value={inflowRoutes && totalSum ? Math.round((inflowRoutes.etc / totalSum) * 100) : 0}
                inflowType={'etc'}
            />
        </div>
    );
}
