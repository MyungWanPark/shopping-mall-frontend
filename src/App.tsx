import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import SideBar from './components/SideBar';

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={true} />
            <AuthContextProvider>
                <Navbar />
                <div className="flex">
                    <div className="basis-1/5">
                        <SideBar />
                    </div>
                    <div className="basis-4/5">
                        <Outlet />
                    </div>
                </div>
            </AuthContextProvider>
        </QueryClientProvider>
    );
}

export default App;
