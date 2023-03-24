import React from 'react';
import ProductCard from './ProductCard';
import useProducts from '../../hooks/useProducts';
import { useSearchParams } from 'react-router-dom';
import { Category } from '../../types/product';

type Prop = {
    showAllProduct?: boolean;
};

export default function Products({ showAllProduct }: Prop) {
    const [searchParams, setSearchParams] = useSearchParams();
    let category = searchParams.get('category') as Category;
    const keyword = searchParams.get('keyword') as string | undefined;
    if (showAllProduct) {
        category = 'all';
    }
    const {
        getProducts: { isLoading: categoryIsLoading, error: categoryError, data: categoryProducts },
        getProductsByKeyword: { isLoading: keywordIsLoading, error: keywordError, data: keywordProducts },
    } = useProducts({ category, keyword });

    return (
        <>
            <p className="px-4 pt-2 text-sm lg:text-lg">
                {(Array.isArray(categoryProducts) && categoryProducts.length) ||
                    (Array.isArray(keywordProducts) && keywordProducts.length)}{' '}
                products found.
            </p>
            {(categoryIsLoading || keywordIsLoading) && <p>isLoading..</p>}
            {(categoryError || keywordError) && <p>{categoryError || keywordError}</p>}
            {Array.isArray(categoryProducts) && (
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                    {categoryProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </ul>
            )}
            {Array.isArray(keywordProducts) && (
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                    {keywordProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </ul>
            )}
        </>
    );
}
