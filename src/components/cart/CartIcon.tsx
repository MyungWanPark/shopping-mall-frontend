import React from 'react';
import { BsCartPlus } from 'react-icons/bs';
import { useAuthContext } from '../../context/AuthContext';
import useCart from '../../hooks/useCart';

export default function CartIcon() {
    const {
        getCart: { data: products },
    } = useCart();
    const { user } = useAuthContext();
    return (
        <div className="relative overflow-visible">
            <BsCartPlus className="text-2xl" />
            {products && user && (
                <div className="absolute -right-2 text-sm leading-6 border border-white -top-3 lg:border-none bg-brand w-6 h-6 overflow-visible text-white rounded-full">
                    {products.length}
                </div>
            )}
        </div>
    );
}
