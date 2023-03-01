import React from 'react';
import { Link } from 'react-router-dom';
import { BiShoppingBag } from 'react-icons/bi';
import UserInfo from '../UserInfo';
import Button from '../ui/Button';
import Cart from '../cart/CartIcon';
import SearchInput from './SearchInput';
import { useAuthContext } from '../../context/AuthContext';

export default function Navbar() {
    const { user, login, logout } = useAuthContext();

    return (
        <header className="flex justify-between border-b border-gray-300 py-2">
            <Link to={'/'} className="flex basis-1/4 justify-center items-center text-3xl text-brand">
                <BiShoppingBag />
                <h1>Fashion Mall</h1>
            </Link>
            <SearchInput />
            <nav className="flex basis-3/4 justify-end items-center gap-6 font-semibold mr-4">
                {user && (
                    <Link to={'/carts'}>
                        <Cart />
                    </Link>
                )}
                {user && <UserInfo user={user} />}
                {/*  {!user && <Button text={'Login'} onClick={login} />}
                {user && <Button text={'Logout'} onClick={logout} />} */}
                {!user && <Link to={'/auth/login'}>Login</Link>}
                {user && <Button text={'Logout'} onClick={logout} />}
            </nav>
        </header>
    );
}
