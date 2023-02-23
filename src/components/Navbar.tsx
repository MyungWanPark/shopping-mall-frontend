import React from 'react';
import { Link } from 'react-router-dom';
import { BiShoppingBag } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { GoGraph } from 'react-icons/go';
import UserInfo from './UserInfo';
import Button from './ui/Button';
import { useAuthContext } from '../context/AuthContext';
import Cart from './CartIcon';

export default function Navbar() {
    const { user, login, logout } = useAuthContext();

    return (
        <header className="flex justify-between border-b border-gray-300 p-2">
            <Link to={'/'} className="flex items-center text-3xl text-brand">
                <BiShoppingBag />
                <h1>Fashion Mall</h1>
            </Link>
            <nav className="flex items-center gap-4 font-semibold">
                <Link to={'/products'}>Shop</Link>
                {user && (
                    <Link to={'/carts'}>
                        <Cart />
                    </Link>
                )}
                {user && user.isAdmin && (
                    <Link to={'/products/new'} className="text-2xl">
                        <AiOutlineEdit />
                    </Link>
                )}
                {user && user.isAdmin && (
                    <Link to={'/analytics'} className="text-2xl text-brand">
                        <GoGraph />
                    </Link>
                )}
                {user && <UserInfo user={user} />}
                {!user && <Button text={'Login'} onClick={login} />}
                {user && <Button text={'Logout'} onClick={logout} />}
            </nav>
        </header>
    );
}
