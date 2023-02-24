import React from 'react';
import AnalyticsSmallBox from '../components/ui/AnalyticsSmallBox';
import { BiShoppingBag } from 'react-icons/bi';

export default function Analytics() {
    return (
        <section>
            <article></article>
            <article className="grid grid-cols-4 gap-2">
                <AnalyticsSmallBox
                    logoIcon={<BiShoppingBag />}
                    title="Sales 현황"
                    value="3000만원"
                    color="bg-green-400"
                />
                <AnalyticsSmallBox
                    logoIcon={<BiShoppingBag />}
                    title="Sales 현황"
                    value="3000만원"
                    color="bg-green-400"
                />
                <AnalyticsSmallBox
                    logoIcon={<BiShoppingBag />}
                    title="Sales 현황"
                    value="3000만원"
                    color="bg-green-400"
                />
                <AnalyticsSmallBox
                    logoIcon={<BiShoppingBag />}
                    title="Sales 현황"
                    value="3000만원"
                    color="bg-green-400"
                />
            </article>
        </section>
    );
}
