import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Category, ProductType } from '../types/product';
import { useProductContext } from '../context/ProductContext';

export default function useProducts({
    category = 'all',
    productId,
    keyword,
}: {
    category?: Category;
    productId?: number;
    keyword?: string;
}) {
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
        data?: ProductType[];
    } = useQuery(
        ['products', category || 'category not set'],
        category ? () => productService.getProductsByCategory(category!) : () => 'category not set',
        {
            staleTime: 1000 * 60 * 60 * 24,
        }
    );

    const getProductsByKeyword: {
        isLoading: boolean;
        error: any;
        data?: ProductType[];
    } = useQuery(
        ['products', keyword || 'keyword not set'],
        keyword ? () => productService.getProductsByKeyword(keyword) : () => 'keyword not set',
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

    return { addNewProduct, getProducts, getProductsByKeyword, getProductInfo };
}
