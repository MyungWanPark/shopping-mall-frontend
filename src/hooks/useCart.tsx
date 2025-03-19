import React, { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CartItemType } from '../types/cart';
import { useCartContext } from '../context/CartContext';
import { useAuthContext } from '../context/AuthContext';
import { User } from '../types/user';
import { useDispatch, useSelector } from 'react-redux';
import { syncCartWithServer, addItem, updateItem, deleteItem, clearCart } from '../redux/slices/cartSlice';
import { RootState } from '../redux/store';

/* 

1. 로그인 하지 않았을 때
    1-1. 로컬 스토리지에 장바구니 추가
        형식: 

2. 로그인 했을 때
    2-1. 로컬 스토리지에 있는 상품을 유저의 기존 장바구니에 업데이트 및 로컬 스토리지 초기화
    2-2. 업데이트 된 장바구니 DB를 브라우저에서 사용

*/

export default function useCart(startDate?: Date, endDate?: Date) {
    const queryClient = useQueryClient();
    const { cartService } = useCartContext();
    const { user }: { user: User } = useAuthContext();
    const dispatch = useDispatch();

    useEffect(() => {
        syncLocalCart();
    }, [user]);

    const getCart: {
        isLoading: boolean;
        error: any;
        data?: CartItemType[];
    } = useQuery(
        ['cart', user?.id ? user.id : ''],
        () => {
            if (!user) return [];
            return cartService.getCartItems().catch((e) => "Can't get cart data");
        },
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

    const syncLocalCart = async () => {
        if (!user) return;
        const localCart = JSON.parse(localStorage.getItem('cart') || '[]');

        if (localCart.length > 0) {
            await syncCartMutation.mutateAsync(localCart);
            dispatch(clearCart());
        }
    };

    const syncCartMutation = useMutation((cartItems: CartItemType[]) => cartService.syncCart(cartItems), {
        onSuccess: () => queryClient.invalidateQueries(['cart']),
    });

    const addToCart = useMutation((cartItem: CartItemType) => cartService.addToCart(cartItem), {
        onSuccess: () => {
            queryClient.invalidateQueries(['cart', user?.id ? user.id : '']);
        },
    });

    const updateCartItem = useMutation(
        (updatedItem: CartItemType) => {
            return cartService.updateCartItem(updatedItem);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['cart', user?.id || '']);
            },
        }
    );

    const deleteCartItem = useMutation((productId: number) => cartService.deleteCartItem({ productId }), {
        onSuccess: () => {
            queryClient.invalidateQueries(['cart', user?.id || '']);
        },
    });

    return { getCart, getOrderedCartByPeriod, addToCart, updateCartItem, deleteCartItem, syncLocalCart };
}
