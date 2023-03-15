import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CartItemType } from '../types/cart';
import { useCartContext } from '../context/CartContext';
import { useAuthContext } from '../context/AuthContext';
import { User } from '../types/user';

export default function useCart() {
    const queryClient = useQueryClient();
    const { user }: { user: User } = useAuthContext();
    const { cartService } = useCartContext();

    const getCart: {
        isLoading: boolean;
        error: any;
        data?: CartItemType[];
    } = useQuery(['cart', user.id ? user.id : ''], () => cartService.getCartItems(), {
        staleTime: 1000 * 60 * 60 * 24,
    });

    const getOrderedCart: {
        isLoading: boolean;
        error: any;
        data?: CartItemType[];
    } = useQuery(['cartOrdered', user.id ? user.id : ''], () => cartService.getOrderedCartItems(), {
        staleTime: 1000 * 60 * 60 * 24,
    });

    const addToCart = useMutation((product: CartItemType) => cartService.addToCart(product), {
        onSuccess: () => queryClient.invalidateQueries(['cart', user.id ? user.id : '']),
    });

    const updateCartItem = useMutation((product: CartItemType) => cartService.updateCartItem(product), {
        onSuccess: () => queryClient.invalidateQueries(['cart', user.id ? user.id : '']),
    });

    const deleteCartItem = useMutation((productId: number) => cartService.deleteCartItem({ productId }), {
        onSuccess: () => queryClient.invalidateQueries(['cart', user.id ? user.id : '']),
    });

    return { getCart, getOrderedCart, addToCart, updateCartItem, deleteCartItem };
}
