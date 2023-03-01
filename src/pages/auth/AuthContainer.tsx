import React from 'react';
import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthProvider } from '../../context/AuthContext';
import HttpClient from '../../network/http';
import AuthService from '../../service/auth';

const queryClient = new QueryClient();
const baseURL = process.env.REACT_APP_BASE_URL;
const httpClient = new HttpClient(baseURL);
const authService = new AuthService(httpClient);

export default function AuthContainer() {
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={true} />
            <AuthProvider authService={authService}>
                <Outlet />
            </AuthProvider>
        </QueryClientProvider>
    );
}
