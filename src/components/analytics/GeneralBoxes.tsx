import React from 'react';
import AnalyticsSmallBox from '../ui/AnalyticsSmallBox';
import { BiShoppingBag } from 'react-icons/bi';
import { User } from '../../types/user';
import { ProductType } from '../../types/product';
import { CartItemType } from '../../types/cart';
import { getHotItem } from '../../utils/analytics/orderedData';

type Prop = {
    data: {
        orderedCartItems?: CartItemType[];
        products?: ProductType[];
        userInfos?: User[];
    };
};

export default function GeneralBoxes({ data: { orderedCartItems, products, userInfos } }: Prop) {
    let salesAmount;
    let usersNum;
    let salesVolumn;
    let hotItemVol;
    let hotItemName;

    if (products && orderedCartItems && orderedCartItems.length > 0) {
        salesAmount = orderedCartItems
            .map((item) => item.totalPricePerProduct)
            .reduce((prev, curr) => prev! + curr!, 0);

        salesVolumn = orderedCartItems.map((item) => item.quantity).reduce((prev, curr) => prev! + curr!, 0);
        const nameVolumnArr = getHotItem(orderedCartItems, products);
        hotItemVol = Math.max(...nameVolumnArr.map((item) => item.volumn));
        const maxId = nameVolumnArr.map((item) => item.volumn).indexOf(hotItemVol);
        hotItemName = nameVolumnArr[maxId].productName;
    }

    if (userInfos && userInfos.length > 0) {
        usersNum = userInfos.length;
    }

    return (
        <div className="grid grid-cols-4 gap-2">
            <AnalyticsSmallBox
                logoIcon={<BiShoppingBag />}
                title="Sales 현황"
                value={`${salesAmount ? salesAmount : 0} 원`}
                color="bg-green-400"
            />
            <AnalyticsSmallBox
                logoIcon={<BiShoppingBag />}
                title="New Users"
                value={`${usersNum ? usersNum : 0} 명`}
                color="bg-green-400"
            />
            <AnalyticsSmallBox
                logoIcon={<BiShoppingBag />}
                title="판매량"
                value={`${salesVolumn ? salesVolumn : 0} 개`}
                color="bg-green-400"
            />
            <AnalyticsSmallBox
                logoIcon={<BiShoppingBag />}
                title="Hot Sales Item"
                value={hotItemVol ? `${hotItemName} (${hotItemVol}개)` : '없습니다.'}
                color="bg-green-400"
            />
        </div>
    );
}
