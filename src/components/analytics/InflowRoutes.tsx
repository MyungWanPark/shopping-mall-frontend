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

    if (userInfos && userInfos.length > 0) {
        getInflowRouteData(userInfos);
    }

    return (
        <div className="grid grid-cols-4 gap-2">
            <InflowRoute />
            <InflowRoute />
            <InflowRoute />
            <InflowRoute />
        </div>
    );
}
