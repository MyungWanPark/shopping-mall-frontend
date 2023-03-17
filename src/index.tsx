import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './pages/notFound/NotFound';
import Home from './pages/Home';
import AllProducts from './pages/product/AllProducts';
import NewProducts from './pages/product/NewProducts';
import ProductDetail from './pages/product/ProductDetail';
import MyCart from './pages/cart/MyCart';
import ProtectedRoute from './pages/ProtectedRoute';
import Analytics from './pages/analytics/Analytics';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';

/*
  /             =>  <Home />
  /products     =>  <AllProducts />
  /products/new =>  <NewProducts />
  /products/:id =>  <ProductDetail />
  /carts        =>  <MyCart />      
*/

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <NotFound />,
        children: [
            { index: true, path: '/', element: <Home /> },
            { path: '/products', element: <AllProducts /> },
            {
                path: '/products/new',
                element: (
                    <ProtectedRoute requiredAdmin={false}>
                        <NewProducts />
                    </ProtectedRoute>
                ),
            },
            { path: '/products/:id', element: <ProductDetail /> },
            {
                path: '/carts',
                element: (
                    <ProtectedRoute requiredAdmin={false}>
                        <MyCart />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/analytics',
                element: (
                    <ProtectedRoute requiredAdmin={false}>
                        <Analytics />
                    </ProtectedRoute>
                ),
            },
            { path: '/auth/register', element: <Register /> },
            { path: '/auth/login', element: <Login /> },
        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    // <React.StrictMode>
    <RouterProvider router={router} />
    // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
