import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import AllProducts from './pages/AllProducts';
import NewProducts from './pages/NewProducts';
import ProductDetail from './pages/ProductDetail';
import MyCart from './pages/MyCart';

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
            { path: '/products/new', element: <NewProducts /> },
            { path: '/products/:id', element: <ProductDetail /> },
            { path: '/carts', element: <MyCart /> },
        ],
    },
]);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
