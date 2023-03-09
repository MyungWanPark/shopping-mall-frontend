import React from 'react';
import ProductCard from './ProductCard';
import useProducts from '../../hooks/useProducts';
import { useSearchParams } from 'react-router-dom';
import { Category } from '../../types/product';

export default function Products() {
    const [searchParams, setSearchParams] = useSearchParams();
    const category = searchParams.get('category') as Category;
    const {
        getProducts: { isLoading, error, data: products },
    } = useProducts({ category });

    return (
        <>
            <p>show {category} products</p>
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
