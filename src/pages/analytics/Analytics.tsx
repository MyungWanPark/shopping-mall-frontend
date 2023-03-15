import React, { useState } from 'react';
import AnalyticsSmallBox from '../../components/ui/AnalyticsSmallBox';
import { BiShoppingBag } from 'react-icons/bi';
import DateRangePicker from '../../components/analytics/DateRangePicker';
import MixedChart from '../../components/analytics/MixedChart';
import PieChart from '../../components/analytics/PieChart';
import InflowRoute from '../../components/analytics/InflowRoute';
import useOrder from './../../hooks/useOrder';
import { getPeriodTime } from './../../utils/analytics/time';
import { Period } from '../../types/analytics';
import useCart from './../../hooks/useCart';
import useProducts from './../../hooks/useProducts';

let renderCount = 0;
const { start, end } = getPeriodTime(new Date(), new Date());

export default function Analytics() {
    console.log(`start&end = ${start}&${end}`);
    const [period, setPeriod] = useState<Period>({ start, end });
    const {
        getAllOrders: { isLoading, data },
        getOrdersByDate: { data: periodOrders },
    } = useOrder(period.start, period.end);
    console.log(`useOrder rendered Analytics = ${renderCount++}`);

    const {
        getOrderedCartByPeriod: { data: orderedCartItems },
    } = useCart(period.start, period.end);

    // console.log(`useOrder, useCart rendered Analytics = ${renderCount++}`);

    console.log(`orderedCartItems = ${JSON.stringify(orderedCartItems)}`);
    const {
        getProducts: { data: products },
    } = useProducts({ category: 'all' });
    console.log(`useProducts, useOrder, useCart rendered Analytics = ${renderCount++}`);
    return (
        <section>
            <article>
                <DateRangePicker setPeriod={setPeriod} dataStatus={{ isLoading, data }} />
            </article>
            <article className="grid grid-cols-4 gap-2">
                <AnalyticsSmallBox
                    logoIcon={<BiShoppingBag />}
                    title="Sales 현황"
                    value="3000만원"
                    color="bg-green-400"
                />
                <AnalyticsSmallBox logoIcon={<BiShoppingBag />} title="New Users" value="100 명" color="bg-green-400" />
                <AnalyticsSmallBox logoIcon={<BiShoppingBag />} title="판매량" value="120 건" color="bg-green-400" />
                <AnalyticsSmallBox
                    logoIcon={<BiShoppingBag />}
                    title="Hot Sales Item"
                    value="여자 옷1 이름"
                    color="bg-green-400"
                />
            </article>
            <article className="flex">
                <MixedChart data={{ period, periodOrders, orderedCartItems }} />
                <PieChart data={{ periodOrders, orderedCartItems, products }} />
            </article>
            <article>
                <InflowRoute />
            </article>
        </section>
    );
}
