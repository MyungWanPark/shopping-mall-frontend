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
import GeneralBoxes from '../../components/analytics/GeneralBoxes';
import useUser from './../../hooks/useUser';
import InflowRoutes from '../../components/analytics/InflowRoutes';
import 'dayjs/locale/ko';
import dayjs from 'dayjs';

export const ANALYTICS_BOX_CLASS_NAME = 'bg-white rounded-xl shadow-sm';

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
        <section className="bg-zinc-200 p-4 py-8">
            <article className="flex items-center justify-center mb-5">
                <p className={`mr-5  p-4 ${ANALYTICS_BOX_CLASS_NAME}`}>{`${dayjs(period.start).format(
                    'YYYY-MM-DD'
                )} ~ ${dayjs(period.end).format('YYYY-MM-DD')} 기간을 분석합니다.`}</p>
                <DateRangePicker setPeriod={setPeriod} dataStatus={{ isLoading, allUserInfos }} />
            </article>
            <article className="">
                <GeneralBoxes data={{ orderedCartItems, products, userInfos }} />
            </article>
            <article className="flex mt-8">
                <MixedChart data={{ period, periodOrders, orderedCartItems }} />
                <PieChart data={{ orderedCartItems, products }} />
            </article>
            <article>
                <InflowRoutes data={{ userInfos }} />
            </article>
        </section>
    );
}
