import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addNewProduct, getProductsFromDB } from '../api/firebase';
import { ProductType } from '../pages/NewProducts';
import { UpdatedProductType } from '../types/product';

export default function useProducts(path?: string) {
    const queryClient = useQueryClient();
    const addProduct = useMutation(
        ({ product, imgURL }: { product: ProductType; imgURL: string }) => addNewProduct(product, imgURL),
        {
            onSuccess: () => queryClient.invalidateQueries(['products']),
        }
    );
    const getProducts: {
        isLoading: boolean;
        error: any;
        data?: UpdatedProductType[];
    } = useQuery(['products', `${path}`], () => getProductsFromDB(path), {
        staleTime: 1000 * 60 * 60 * 24,
    });

    return { addProduct, getProducts };
}
