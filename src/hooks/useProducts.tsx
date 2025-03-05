import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Category, PaginationData, ProductType } from '../types/product';
import { useProductContext } from '../context/ProductContext';

type Props = {
    category?: Category;
    productId?: number;
    keyword?: string;
    page?: number;
};

export default function useProducts({ category = 'all', productId, keyword, page = 1 }: Props) {
    const { productService } = useProductContext();

    const queryClient = useQueryClient();

    const addNewProduct = useMutation(
        async ({ product, imgURL }: { product: ProductType; imgURL: string }) =>
            productService.addProduct({ ...product, imgURL }),
        {
            onSuccess: () => queryClient.invalidateQueries(['products']),
        }
    );

    const getProducts: {
        isLoading: boolean;
        error: any;
        data?: PaginationData[];
    } = useQuery(
        ['products', category || 'category not set', keyword || 'keyword not set'],

        () => {
            if (keyword) {
                return productService.getProductsByKeyword(keyword, page);
            } else if (category) {
                return productService.getProductsByCategory(category, page);
            } else {
                return [];
            }
        },

        {
            staleTime: 1000 * 60 * 60 * 24,
        }
    );

    const getProductInfo: {
        isLoading: boolean;
        error: any;
        data?: ProductType;
    } = useQuery(
        ['products', 'productsInfo', productId || 'productId not set'],
        productId ? () => productService.getProductByProductId(productId!) : () => 'productId not set',
        {
            staleTime: 1000 * 60 * 60 * 24,
        }
    );

    return { addNewProduct, getProducts, getProductInfo };
}
