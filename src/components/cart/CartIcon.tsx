import React from 'react';
import { BsCartPlus } from 'react-icons/bs';
import useCart from '../../hooks/useCart';

export default function CartIcon() {
    const {
        getCart: { data: products },
    } = useCart();

    return (
        <div className="relative overflow-visible">
            <BsCartPlus className="text-2xl" />
            {products && (
                <div className="absolute -right-2 border border-white -top-2 lg:border-none bg-brand w-6 h-6 overflow-visible text-white rounded-full">
                    {products!.length}
                </div>
            )}
        </div>
    );
}
