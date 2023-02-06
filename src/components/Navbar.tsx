import React from 'react';
import { Link } from 'react-router-dom';
import { BiShoppingBag } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';

export default function Navbar() {
    return (
        <header>
            <Link to={'/'}>
                <BiShoppingBag />
                <h1>Shopping Mall</h1>
            </Link>
            <nav>
                <Link to={'/products'}>Products</Link>
                <Link to={'/carts'}>Carts</Link>
                <Link to={'/products/new'}>
                    <AiOutlineEdit />
                </Link>
                <button>Login</button>
            </nav>
        </header>
    );
}
