import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthContext';
import { changeItemFromCart, getCartFromDB, removeItemFromCart } from '../api/firebase';
import { CartProductType } from '../types/product';

export default function useCart() {
    const {
        user: { uid },
    } = useAuthContext();

    const queryClient = useQueryClient();
    const addOrUpdateCart = useMutation((product: CartProductType) => changeItemFromCart(uid, product), {
        onSuccess: () => queryClient.invalidateQueries(['cart', uid || '']),
    });

    const removeFromCart = useMutation((productId: string) => removeItemFromCart(uid, productId), {
        onSuccess: () => queryClient.invalidateQueries(['cart', uid || '']),
    });

    const getCart: {
        isLoading: boolean;
        error: any;
        data?: CartProductType[];
    } = useQuery(['cart', uid || ''], () => getCartFromDB(uid), {
        staleTime: 1000 * 60 * 60 * 24,
    });

    return { getCart, addOrUpdateCart, removeFromCart };
}
