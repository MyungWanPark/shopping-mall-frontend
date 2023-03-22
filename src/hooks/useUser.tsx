import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthContext';
import { User } from '../types/user';
import AuthService from './../service/auth';

export default function useUser(startDate?: Date, endDate?: Date) {
    const queryClient = useQueryClient();
    const { authService, user }: { authService: AuthService; user: User } = useAuthContext();

    const getAllUser: {
        isLoading: boolean;
        error: any;
        data?: User[];
    } = useQuery(['user'], () => authService.getAllUsers(), {
        staleTime: 1000 * 60 * 60 * 24,
    });

    const getUserByPeriod: {
        isLoading: boolean;
        error: any;
        data?: User[];
    } = useQuery(
        ['user', `${startDate}&${endDate}`],
        startDate ? () => authService.getUsersByDate(startDate!, endDate!) : () => 'Date not set',
        {
            staleTime: 1000 * 60 * 60 * 24,
        }
    );

    const addUser = useMutation((userInfo: User) => authService.register(userInfo), {
        onSuccess: () => {
            queryClient.invalidateQueries(['user']);
            queryClient.invalidateQueries(['cart', user?.id ? user.id : '']);
        },
    });

    return { getAllUser, getUserByPeriod, addUser };
}
