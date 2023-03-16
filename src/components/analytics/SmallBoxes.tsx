import React from 'react';
import AnalyticsSmallBox from './../ui/AnalyticsSmallBox';
import { BiShoppingBag } from 'react-icons/bi';

export default function SmallBoxes() {
    return (
        <div className="grid grid-cols-4 gap-2">
            <AnalyticsSmallBox logoIcon={<BiShoppingBag />} title="Sales 현황" value="3000만원" color="bg-green-400" />
            <AnalyticsSmallBox logoIcon={<BiShoppingBag />} title="New Users" value="100 명" color="bg-green-400" />
            <AnalyticsSmallBox logoIcon={<BiShoppingBag />} title="판매량" value="120 건" color="bg-green-400" />
            <AnalyticsSmallBox
                logoIcon={<BiShoppingBag />}
                title="Hot Sales Item"
                value="여자 옷1 이름"
                color="bg-green-400"
            />
        </div>
    );
}
