import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CartItemType } from '../types/cart';
import { useCartContext } from '../context/CartContext';
import { useAuthContext } from '../context/AuthContext';
import { User } from '../types/user';

export default function useCart(startDate?: Date, endDate?: Date) {
    const queryClient = useQueryClient();
    const { cartService } = useCartContext();
    const { user }: { user: User } = useAuthContext();

    const getCart: {
        isLoading: boolean;
        error: any;
        data?: CartItemType[];
    } = useQuery(
        ['cart', user?.id ? user.id : ''],
        () => cartService.getCartItems().catch((e) => "Can't get cart data"),
        {
            staleTime: 1000 * 60 * 60 * 24,
        }
    );

    const getOrderedCartByPeriod: {
        isLoading: boolean;
        error: any;
        data?: CartItemType[];
    } = useQuery(
        ['orderedCart', `${startDate}&${endDate}`],
        startDate ? () => cartService.getOrderedCartItems(startDate!, endDate!) : () => 'Date not set',
        {
            staleTime: 1000 * 60 * 60 * 24,
        }
    );

    const addToCart = useMutation((product: CartItemType) => cartService.addToCart(product), {
        onSuccess: () => queryClient.invalidateQueries(['cart', user?.id ? user.id : '']),
    });

    const updateCartItem = useMutation((product: CartItemType) => cartService.updateCartItem(product), {
        onSuccess: () => queryClient.invalidateQueries(['cart', user?.id ? user.id : '']),
    });

    const deleteCartItem = useMutation((productId: number) => cartService.deleteCartItem({ productId }), {
        onSuccess: () => queryClient.invalidateQueries(['cart', user?.id ? user.id : '']),
    });

    return { getCart, getOrderedCartByPeriod, addToCart, updateCartItem, deleteCartItem };
}
