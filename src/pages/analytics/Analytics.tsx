import React, { useState } from 'react';
import DateRangePicker from '../../components/analytics/DateRangePicker';
import MixedChart from '../../components/analytics/MixedChart';
import PieChart from '../../components/analytics/PieChart';
import InflowRoute from '../../components/analytics/InflowRoute';
import useOrder from './../../hooks/useOrder';
import { getPeriodTime } from './../../utils/analytics/time';
import { Period } from '../../types/analytics';
import useCart from './../../hooks/useCart';
import useProducts from './../../hooks/useProducts';
import SmallBoxes from '../../components/analytics/SmallBoxes';
import useUser from './../../hooks/useUser';

export default function Analytics() {
    const { start, end } = getPeriodTime(new Date(), new Date());

    const [period, setPeriod] = useState<Period>({ start, end });
    const {
        getOrdersByDate: { data: periodOrders },
    } = useOrder(period.start, period.end);

    const {
        getOrderedCartByPeriod: { data: orderedCartItems },
    } = useCart(period.start, period.end);

    const {
        getAllUser: { data: allUserInfos },
        getUserByPeriod: { isLoading, data: userInfos },
    } = useUser(period.start, period.end);

    const {
        getProducts: { data: products },
    } = useProducts({ category: 'all' });

    console.log(`userInfos in analytics = ${JSON.stringify(userInfos)}`);

    return (
        <section>
            <article>
                <DateRangePicker setPeriod={setPeriod} dataStatus={{ isLoading, allUserInfos }} />
            </article>
            <article>
                <SmallBoxes />
            </article>
            <article className="flex">
                <MixedChart data={{ period, periodOrders, orderedCartItems }} />
                <PieChart data={{ orderedCartItems, products }} />
            </article>
            <article>
                <InflowRoute />
            </article>
        </section>
    );
}
