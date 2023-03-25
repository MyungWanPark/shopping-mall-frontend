import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiShoppingBag } from 'react-icons/bi';
import { GiHamburgerMenu } from 'react-icons/gi';
import { GoGraph } from 'react-icons/go';
import UserInfo from '../UserInfo';
import Button from '../ui/Button';
import Cart from '../cart/CartIcon';
import SearchInput from './SearchInput';
import { useAuthContext } from '../../context/AuthContext';

const NAV_ITEM_CLASS =
    'w-full hover:bg-red-500 rounded-lg p-2 transition-all nav-item lg:hover:bg-transparent lg:hover:text-brand';
const LINK_CLASS = 'inline-block w-full';

export default function Navbar() {
    const { user, logout } = useAuthContext();
    const navigate = useNavigate();
    const handleClick = (e: React.MouseEvent) => {
        if (window.innerWidth > 1024) {
            return;
        }
        const navContent = document.querySelector('#navbarId') as HTMLDivElement;
        navContent.classList.toggle('h-84');
        navContent.style.transition = 'height 0.5s ease';
    };

    return (
        <nav className="bg-brand font-Raleway sticky top-0 z-20 w-full flex flex-col items-center justify-between px-2 py-3 border-b border-red-200 lg:bg-white lg:flex-row">
            <div className="flex-1 px-2 w-full relative flex justify-between items-center lg:w-auto lg:basis-10/20 lg:static lg:justify-start lg:px-4">
                <Link
                    to={'/'}
                    className="text-white flex justify-center items-center text-3xl lg:text-brand lg:basis-7/12"
                >
                    <BiShoppingBag />
                    <h1 className="hidden lg:block lg:basis-8/12">The Style</h1>
                </Link>
                <SearchInput />
                <button className="lg:hidden text-2xl" onClick={handleClick}>
                    <GiHamburgerMenu className="text-white" />
                </button>
            </div>
            <div
                className="h-0 w-full overflow-hidden lg:basis-10/20 lg:overflow-visible lg:h-auto lg:flex flex-grow items-center"
                id="navbarId"
            >
                <ul className="flex lg:justify-start text-white flex-col w-full text-center items-center lg:flex-row lg:text-black list-none mr-auto">
                    <li className={`${NAV_ITEM_CLASS} lg:basis-1/20`}>
                        <Link to={'/products?category=men'} className={LINK_CLASS} onClick={handleClick}>
                            Men
                        </Link>
                    </li>
                    <li className={`${NAV_ITEM_CLASS} lg:basis-1/20`}>
                        <Link to={'/products?category=women'} className={LINK_CLASS} onClick={handleClick}>
                            Women
                        </Link>
                    </li>
                    <li className={`${NAV_ITEM_CLASS} lg:basis-1/20`}>
                        <Link to={'/products?category=bag'} className={LINK_CLASS} onClick={handleClick}>
                            Bag
                        </Link>
                    </li>
                    <li className={`${NAV_ITEM_CLASS} lg:basis-1/20`}>
                        <Link to={'/products?category=shoes'} className={LINK_CLASS} onClick={handleClick}>
                            Shoes
                        </Link>
                    </li>
                    <li
                        className={`${NAV_ITEM_CLASS} ${LINK_CLASS} lg:basis-1/20 flex justify-center cursor-pointer`}
                        onClick={(e) => {
                            handleClick(e);
                            user && navigate('/carts');
                            !user && alert('로그인이 필요합니다.');
                        }}
                    >
                        {/* <Link to={'/carts'} className={`${LINK_CLASS} flex justify-center`}> */}
                        <Cart />
                        {/* </Link> */}
                    </li>
                </ul>
                <ul className="flex lg:justify-end text-white flex-col w-full text-center items-center lg:flex-row lg:text-black list-none mr-auto">
                    <li
                        className={`${NAV_ITEM_CLASS} flex justify-center items-center lg:basis-1/20`}
                        onClick={handleClick}
                    >
                        <Link to={'/analytics'} className={`${LINK_CLASS} flex justify-center`}>
                            <GoGraph className="text-2xl md:text-emerald-600" />
                        </Link>
                    </li>
                    <li className={`${NAV_ITEM_CLASS} lg:basis-1/20`}>
                        <Link to={'/products/new'} className={LINK_CLASS} onClick={handleClick}>
                            New
                        </Link>
                    </li>

                    {user && (
                        <li className={`${NAV_ITEM_CLASS} hidden lg:block lg:basis-5/20`} onClick={handleClick}>
                            {' '}
                            <UserInfo user={user} />
                        </li>
                    )}
                    {!user && (
                        <li className={`${NAV_ITEM_CLASS} lg:basis-1/20`} onClick={handleClick}>
                            <Button text={'Login'} onClick={() => navigate('/auth/login')} customCss="bg-transparent" />
                            {/* <Link to={'/auth/login'}>Login</Link> */}
                        </li>
                    )}
                    {user && (
                        <li className={`${NAV_ITEM_CLASS} w-full lg:basis-1/20`} onClick={handleClick}>
                            <Button text={'Logout'} onClick={logout} customCss="bg-transparent w-full" />
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}
