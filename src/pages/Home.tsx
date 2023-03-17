import React from 'react';
import Banner from '../components/Banner';
import Products from '../components/products/Products';

export default function Home() {
    return (
        <section className="flex flex-col">
            <Banner />
            <Products showAllProduct={true} />
        </section>
    );
}
