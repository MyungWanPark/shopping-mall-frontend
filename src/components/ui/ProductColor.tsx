import React from 'react';
import { CartItemType } from '../../types/cart';
import { handleColor } from '../../utils/product/detail';

type Props = {
    id: string;
    setState: React.Dispatch<React.SetStateAction<CartItemType>>;
    colorClass: string;
};

export default function ProductColor({ id, setState, colorClass }: Props) {
    return (
        <span
            id={id}
            className={`colorBtn mr-2 inline-block border transition-all rounded-full w-5 h-5 ${colorClass} opacity-70 cursor-pointer`}
            onClick={(e) => handleColor({ e, setState })}
        ></span>
    );
}
