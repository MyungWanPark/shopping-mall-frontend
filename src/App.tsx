import React from 'react';
import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './App.css';
import Navbar from './components/navbar/Navbar';
import HttpClient from './network/http';
import AuthService from './service/auth';
import { AuthProvider } from './context/AuthContext';
import ProductService from './service/product';
import { ProductProvider } from './context/ProductContext';
import CartService from './service/cart';
import OrderService from './service/order';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';

const queryClient = new QueryClient();
const baseURL = process.env.REACT_APP_BASE_URL;
const httpClient = new HttpClient(baseURL);
const authService = new AuthService(httpClient);
const productService = new ProductService(httpClient);
const cartService = new CartService(httpClient);
const orderService = new OrderService(httpClient);

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={true} />
            <AuthProvider authService={authService}>
                <ProductProvider productService={productService}>
                    <CartProvider cartService={cartService}>
                        <OrderProvider orderService={orderService}>
                            <Navbar />
                            <Outlet />
                        </OrderProvider>
                    </CartProvider>
                </ProductProvider>
            </AuthProvider>
        </QueryClientProvider>
    );
}

export default App;
