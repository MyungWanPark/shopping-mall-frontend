import React, { useState } from 'react';
import AnalyticsSmallBox from '../../components/ui/AnalyticsSmallBox';
import { BiShoppingBag } from 'react-icons/bi';
import DateRangePicker from '../../components/analytics/DateRangePicker';
import MixedChart from '../../components/analytics/MixedChart';
import PieChart from '../../components/analytics/PieChart';
import SalesTable from '../../components/analytics/SalesTable';
import InflowRoute from '../../components/analytics/InflowRoute';
import useOrder from './../../hooks/useOrder';

export default function Analytics() {
    const [period, setPeriod] = useState<Date[]>();
    console.log(`period = ${period}`);
    const { getAllOrders, getOrdersByDate } = useOrder(period && period[0], period && period[1]);
    // console.log(`getAllOrders.data = ${JSON.stringify(getAllOrders.data)}`);
    console.log(`getOrdersByDate.data = ${JSON.stringify(getOrdersByDate.data)}`);
    return (
        <section>
            <article>
                <DateRangePicker setPeriod={setPeriod} />
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
                <MixedChart />
                <PieChart />
            </article>
            <article>
                <SalesTable />
            </article>
            <article>
                <InflowRoute />
            </article>
        </section>
    );
}
