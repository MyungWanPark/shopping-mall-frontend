import React, { useState } from 'react';
import DateRangePicker from '../../components/analytics/DateRangePicker';
import MixedChart from '../../components/analytics/MixedChart';
import PieChart from '../../components/analytics/PieChart';
import useOrder from './../../hooks/useOrder';
import { backToGBTime, getPeriodTime } from './../../utils/analytics/time';
import { Period } from '../../types/analytics';
import useCart from './../../hooks/useCart';
import useProducts from './../../hooks/useProducts';
import GeneralBoxes from '../../components/analytics/GeneralBoxes';
import useUser from './../../hooks/useUser';
import InflowRoutes from '../../components/analytics/InflowRoutes';
import 'dayjs/locale/ko';
import dayjs from 'dayjs';

export const ANALYTICS_BOX_CLASS_NAME = 'bg-white rounded-xl shadow-sm';
export const ANALYTICS_GRID_CLASS_NAME = 'grid grid-cols-1 gap-4 mb-5';

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

    return (
        <section className="bg-zinc-200 p-4 py-8 font-Abel">
            <article className={`${ANALYTICS_GRID_CLASS_NAME} md:grid-cols-2`}>
                <p className={`text-center p-4 ${ANALYTICS_BOX_CLASS_NAME}`}>{`${dayjs(
                    backToGBTime(period.start)
                ).format('YYYY-MM-DD')} ~ ${dayjs(period.end).format('YYYY-MM-DD')} 기간을 분석합니다.`}</p>
                <DateRangePicker setPeriod={setPeriod} dataStatus={{ isLoading, allUserInfos }} />
            </article>
            <article className="">
                <GeneralBoxes data={{ orderedCartItems, products, userInfos }} />
            </article>
            <article className={`${ANALYTICS_GRID_CLASS_NAME} md:grid-cols-2`}>
                <MixedChart
                    data={{
                        period: {
                            start: backToGBTime(period.start),
                            end: backToGBTime(period.end),
                        },
                        periodOrders,
                        orderedCartItems,
                    }}
                />
                <PieChart data={{ orderedCartItems, products }} />
            </article>
            <article>
                <InflowRoutes data={{ userInfos }} />
            </article>
        </section>
    );
}
