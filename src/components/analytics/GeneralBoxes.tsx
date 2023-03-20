import React from 'react';
import AnalyticsSmallBox from '../ui/AnalyticsSmallBox';
import { BiShoppingBag, BiDollar } from 'react-icons/bi';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { FaHotjar } from 'react-icons/fa';
import { User } from '../../types/user';
import { ProductType } from '../../types/product';
import { CartItemType } from '../../types/cart';
import { getHotItem } from '../../utils/analytics/orderedData';
import { ANALYTICS_BOX_CLASS_NAME, ANALYTICS_GRID_CLASS_NAME } from './../../pages/analytics/Analytics';

type Prop = {
    data: {
        orderedCartItems?: CartItemType[];
        products?: ProductType[];
        userInfos?: User[];
    };
};

const SMALL_BOX_CLASS = 'py-4 px-2 flex flex-col items-center';

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
        <div className={`${ANALYTICS_GRID_CLASS_NAME} md:grid-cols-4`}>
            <AnalyticsSmallBox
                logoIcon={<BiDollar />}
                iconStyle="text-sky-400 text-2xl"
                title="Sales 현황"
                value={`${salesAmount ? salesAmount.toLocaleString() : 0} 원`}
                customStyle={`${ANALYTICS_BOX_CLASS_NAME} ${SMALL_BOX_CLASS}`}
            />
            <AnalyticsSmallBox
                logoIcon={<AiOutlineUsergroupAdd />}
                iconStyle="text-green-500 text-2xl"
                title="New Users"
                value={`${usersNum ? usersNum.toLocaleString() : 0} 명`}
                customStyle={`${ANALYTICS_BOX_CLASS_NAME} ${SMALL_BOX_CLASS}`}
            />
            <AnalyticsSmallBox
                logoIcon={<BiShoppingBag />}
                iconStyle="text-orange-400 text-2xl"
                title="판매량"
                value={`${salesVolumn ? salesVolumn.toLocaleString() : 0} 개`}
                customStyle={`${ANALYTICS_BOX_CLASS_NAME} ${SMALL_BOX_CLASS}`}
            />
            <AnalyticsSmallBox
                logoIcon={<FaHotjar />}
                iconStyle="text-red-400 text-2xl"
                title="Hot Sales Item"
                value={hotItemVol ? `${hotItemName} (${hotItemVol.toLocaleString()}개)` : '없습니다.'}
                customStyle={`${ANALYTICS_BOX_CLASS_NAME} ${SMALL_BOX_CLASS}`}
            />
        </div>
    );
}
