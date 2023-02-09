import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../api/firebase';
import ProductCard from './ProductCard';
import { UpdatedProductType } from '../types/product';

export default function Products() {
    const {
        isLoading,
        error,
        data: products,
    }: {
        isLoading: boolean;
        error: any;
        data?: UpdatedProductType[];
    } = useQuery(['products'], () => getProducts(), {
        staleTime: 1000 * 60 * 60 * 24,
    });
    return (
        <>
            {isLoading && <p>isLoading..</p>}
            {error && <p>{error}</p>}
            {products && (
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </ul>
            )}
        </>
    );
}
