import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useOrderContext } from '../context/OrderContext';
import { OrderType } from '../types/order';
import { User } from '../types/user';
import { useAuthContext } from '../context/AuthContext';

export default function useOrder(startDate?: Date, endDate?: Date) {
    const queryClient = useQueryClient();
    const { orderService } = useOrderContext();
    const { user }: { user: User } = useAuthContext();

    /*     const getAllOrders: {
        isLoading: boolean;
        error: any;
        data?: OrderType[];
    } = useQuery(['order'], () => orderService.getAllOrders(), {
        staleTime: 1000 * 60 * 60 * 24,
    }); */

    const getOrdersByDate: {
        isLoading: boolean;
        error: any;
        data?: OrderType[];
    } = useQuery(
        ['order', `${startDate}&${endDate}` || 'byDate'],
        startDate ? () => orderService.getOrdersByDate(startDate!, endDate!) : () => 'Date not set',
        {
            staleTime: 1000 * 60 * 60 * 24,
        }
    );

    const createOrder = useMutation((order: OrderType) => orderService.createOrder(order), {
        onSuccess: () => {
            queryClient.invalidateQueries(['cart', user?.id || '']);
            // queryClient.invalidateQueries(['cartOrdered', user?.id || '']);
            queryClient.invalidateQueries(['orderedCart']);
            queryClient.invalidateQueries(['order']);
            queryClient.invalidateQueries(['products']);
        },
    });

    // return { getAllOrders, createOrder, getOrdersByDate };
    return { createOrder, getOrdersByDate };
}
