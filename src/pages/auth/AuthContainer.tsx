import React from 'react';
import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthContextProvider } from '../../context/AuthContext';

const queryClient = new QueryClient();

export default function AuthContainer() {
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={true} />
            <AuthContextProvider>
                <Outlet />
            </AuthContextProvider>
        </QueryClientProvider>
    );
}
