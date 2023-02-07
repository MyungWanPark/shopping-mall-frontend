import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BiShoppingBag } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { login, logout, onUserStateChanged } from './../api/firebase';
import { User } from 'firebase/auth';
import UserInfo from './UserInfo';

export default function Navbar() {
    const [user, setUser] = useState<User>();
    useEffect(() => {
        onUserStateChanged((user) => setUser(user));
    }, []);

    return (
        <header className="flex justify-between border-b border-gray-300 p-2">
            <Link to={'/'} className="flex items-center text-3xl text-brand">
                <BiShoppingBag />
                <h1>Shopping Mall</h1>
            </Link>
            <nav className="flex items-center gap-4 font-semibold">
                <Link to={'/products'}>Products</Link>
                <Link to={'/carts'}>Carts</Link>
                <Link to={'/products/new'} className="text-2xl">
                    <AiOutlineEdit />
                </Link>
                {user && <UserInfo user={user} />}
                {!user && <button onClick={login}>Login</button>}
                {user && <button onClick={logout}>Logout</button>}
            </nav>
        </header>
    );
}
