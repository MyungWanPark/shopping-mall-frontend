import React from 'react';
import { CartItemType } from '../../types/cart';
import { handleSize } from './../../utils/product/detail';

type Props = {
    size: string;
    setCartProduct: React.Dispatch<React.SetStateAction<CartItemType>>;
};

export default function ProductSize({ size, setCartProduct }: Props) {
    return (
        <div className="flex justify-center items-center border rounded-sm border-black cursor-pointer mr-3">
            <span
                className="inline-block text-center w-7 sizeBtn transition-all"
                onClick={(e) => handleSize({ e, setCartProduct })}
            >
                {size}
            </span>
        </div>
    );
}
