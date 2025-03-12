import React, { useEffect, useState } from 'react';
import { BsCartPlus } from 'react-icons/bs';
import useCart from '../../hooks/useCart';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useAuthContext } from '../../context/AuthContext';
import { User } from '../../types/user';

export default function CartIcon() {
    const {
        getCart: { data: products },
        // cartItems: products,
    } = useCart();

    const reduxCartItems = useSelector((state: RootState) => state.cart.items);
    const [cartItems, setCartItems] = useState(reduxCartItems);
    const { user }: { user: User } = useAuthContext();
    useEffect(() => {
        setCartItems(reduxCartItems);
        if (user) {
            setCartItems(products!);
        }
    }, [user, reduxCartItems, products]);

    return (
        <div className="relative overflow-visible">
            <BsCartPlus className="text-2xl" />
            {
                <div className="absolute -right-2 text-sm leading-6 border border-white -top-3 lg:border-none bg-brand w-6 h-6 overflow-visible text-white rounded-full">
                    {cartItems?.length || 0}
                </div>
            }
        </div>
    );
}
