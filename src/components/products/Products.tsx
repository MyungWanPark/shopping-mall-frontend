import React from 'react';
import ProductCard from './ProductCard';
import useProducts from '../../hooks/useProducts';
import { useSearchParams } from 'react-router-dom';
import { Category } from '../../types/product';

export default function Products() {
    const [searchParams, setSearchParams] = useSearchParams();
    const category = searchParams.get('category') as Category;
    const keyword = searchParams.get('keyword') as string | undefined;

    const {
        getProducts: { isLoading: categoryIsLoading, error: categoryError, data: categoryProducts },
        getProductsByKeyword: { isLoading: keywordIsLoading, error: keywordError, data: keywordProducts },
    } = useProducts({ category, keyword });

    return (
        <>
            <p>show {category || keyword} products</p>
            {(categoryIsLoading || keywordIsLoading) && <p>isLoading..</p>}
            {(categoryError || keywordError) && <p>{categoryError || keywordError}</p>}
            {categoryProducts && (
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                    {categoryProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </ul>
            )}
            {keywordProducts && (
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                    {keywordProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </ul>
            )}
        </>
    );
}
