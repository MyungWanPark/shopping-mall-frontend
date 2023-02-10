import React from 'react';
import { BsCartPlus } from 'react-icons/bs';
import { useQuery } from '@tanstack/react-query';
import { getCart } from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';
export default function CartIcon() {
    const {
        user: { uid },
    } = useAuthContext();
    const { data: products } = useQuery(['carts'], () => {
        return getCart(uid);
    });

    return (
        <div className="relative">
            <BsCartPlus className="text-3xl" />
            {products && (
                <span className="absolute -top-2 -right-2 block bg-brand w-6 h-6 text-center text-white rounded-full">
                    {products.length}
                </span>
            )}
        </div>
    );
}
