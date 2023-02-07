import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';

function App() {
    return (
        <AuthContextProvider>
            <Navbar />
            <Outlet />
        </AuthContextProvider>
    );
}

export default App;
