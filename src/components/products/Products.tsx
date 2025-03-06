import React, { useState } from 'react';
import ProductCard from './ProductCard';
import useProducts from '../../hooks/useProducts';
import { useSearchParams } from 'react-router-dom';
import { Category, PaginationData } from '../../types/product';
import { getPaginaionButtons } from '../../utils/pagination/pagination';
import PaginationButtons from '../pagination/PaginationButtons';

type Prop = {
    showAllProduct?: boolean;
};

export default function Products({ showAllProduct }: Prop) {
    const [searchParams, setSearchParams] = useSearchParams();
    let category = searchParams.get('category') as Category;
    const keyword = searchParams.get('keyword') as string | undefined;
    const page = parseInt(searchParams.get('page') || '1', 10);
    const [loadedImg, setLoadedImg] = useState(0);

    if (showAllProduct) {
        category = 'all';
    }
    const {
        getProducts: { isLoading, error, data },
    } = useProducts({ category, keyword, page });

    if (error) return <div>상품을 받아오는데 실패하였습니다..</div>;
    if (isLoading) return <div>로딩중... 상품을 받아오고 있습니다..</div>;

    const { totalPages, products, count } = data as unknown as PaginationData;
    const PaginationButtonArr = getPaginaionButtons(page, totalPages);

    const totalImgs = products.length;
    const isAllImgLoaded = totalImgs === loadedImg;

    return (
        <>
            <p className="px-4 pt-2 text-sm lg:text-lg">{count} products found.</p>
            {isLoading && <p>isLoading..</p>}
            {error && <p>{error}</p>}
            {Array.isArray(products) && (
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            showSkeleton={!isAllImgLoaded}
                            setLoadedImg={() => setLoadedImg((prev) => prev + 1)}
                        />
                    ))}
                </ul>
            )}
            <PaginationButtons totalPages={totalPages} PaginationButtonArr={PaginationButtonArr} />
        </>
    );
}
