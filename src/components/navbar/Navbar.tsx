import React from 'react';
import { Link } from 'react-router-dom';
import { BiShoppingBag } from 'react-icons/bi';
import UserInfo from '../UserInfo';
import Button from '../ui/Button';
import Cart from '../cart/CartIcon';
import SearchInput from './SearchInput';
import { useAuthContext } from '../../context/AuthContext';
import { GiHamburgerMenu } from 'react-icons/gi';
import { GoGraph } from 'react-icons/go';

const NAV_ITEM_CLASS =
    'w-full hover:bg-red-500 lg:hover:bg-transparent lg:hover:text-brand rounded-lg p-1 transition-all nav-item';
const LINK_CLASS = 'inline-block w-full';

export default function Navbar() {
    const { user, login, logout } = useAuthContext();

    const handleClick = (e: React.MouseEvent) => {
        const navContent = document.querySelector('#navbarId') as HTMLDivElement;
        navContent.classList.toggle('h-80');
        navContent.style.transition = 'height 0.5s ease';
    };
    /* 
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
                {!user && <Button text={'Login'} onClick={login} />}
                {user && <Button text={'Logout'} onClick={logout} />}
                {!user && <Link to={'/auth/login'}>Login</Link>}
                {user && <Button text={'Logout'} onClick={logout} />}
            </nav>
        </header>
*/

    return (
        <nav className="bg-brand sticky top-0 z-10 lg:bg-white w-full flex flex-wrap items-center justify-between px-2 py-3 mb-3">
            <div className="flex-1 lg:basis-4/20 w-full relative flex justify-between lg:w-auto  px-4 lg:static lg:block lg:justify-start">
                <Link to={'/'} className="text-white flex justify-center items-center text-3xl lg:text-brand">
                    <BiShoppingBag />
                    <h1>Fashion Mall</h1>
                </Link>
                <button className="lg:hidden text-2xl" onClick={handleClick}>
                    <GiHamburgerMenu className="text-white" />
                </button>
            </div>
            <div
                className="h-0 basis-16/20 overflow-hidden lg:overflow-visible lg:h-auto lg:flex flex-grow items-center"
                id="navbarId"
            >
                <ul className="flex text-white flex-col w-full text-center items-center lg:flex-row lg:text-black list-none mr-auto">
                    <li className="nav-item text-black w-full p-2 lg:basis-3/12">
                        <SearchInput />
                    </li>
                    <li className={`${NAV_ITEM_CLASS} lg:basis-1/20`}>
                        <Link to={'/products?category=men'} className={LINK_CLASS} onClick={handleClick}>
                            Men
                        </Link>
                    </li>
                    <li className={`${NAV_ITEM_CLASS} lg:basis-1/20`}>
                        <Link to={'/products?category=women'} className={LINK_CLASS}>
                            Women
                        </Link>
                    </li>
                    <li className={`${NAV_ITEM_CLASS} lg:basis-1/20`}>
                        <Link to={'/products?category=bag'} className={LINK_CLASS}>
                            Bag
                        </Link>
                    </li>
                    <li className={`${NAV_ITEM_CLASS} lg:basis-1/20`}>
                        <Link to={'/products?category=shoes'} className={LINK_CLASS}>
                            Shoes
                        </Link>
                    </li>
                    <li className={`${NAV_ITEM_CLASS} flex justify-center items-center lg:basis-1/20`}>
                        <Link to={'/analytics'} className={`${LINK_CLASS} flex justify-center`}>
                            <GoGraph />
                        </Link>
                    </li>
                    <li className={`${NAV_ITEM_CLASS} lg:basis-1/20`}>
                        <Link to={'/products/new'} className={LINK_CLASS}>
                            New
                        </Link>
                    </li>
                    <li className={`${NAV_ITEM_CLASS} lg:basis-1/20`}>
                        {user && (
                            <Link to={'/carts'} className={`${LINK_CLASS} flex justify-center`}>
                                <Cart />
                            </Link>
                        )}
                    </li>
                    {user && (
                        <li className={`${NAV_ITEM_CLASS} hidden lg:block lg:basis-1/20`}>
                            {' '}
                            <UserInfo user={user} />
                        </li>
                    )}
                    {!user && (
                        <li className={`${NAV_ITEM_CLASS} lg:basis-1/20`}>
                            <Link to={'/auth/login'}>Login</Link>
                        </li>
                    )}
                    {user && (
                        <li className={`${NAV_ITEM_CLASS} flex flex-col lg:flex-row lg:basis-1/20`}>
                            <Button text={'Logout'} onClick={logout} bgColor="bg-transparent" />
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}
