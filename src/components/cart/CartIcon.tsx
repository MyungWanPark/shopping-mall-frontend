import React from 'react';
import { BsCartPlus } from 'react-icons/bs';
// import useCart from '../../hooks/useCart';

export default function CartIcon() {
    /*     const {
        getCart: { data: products },
    } = useCart(); */

    return (
        <div className="relative">
            <BsCartPlus className="text-3xl" />
            {/* {products && ( */}
            <span className="absolute -top-2 -right-2 block bg-brand w-6 h-6 text-center text-white rounded-full">
                2{/* {products.length} */}
            </span>
            {/* )} */}
        </div>
    );
}
