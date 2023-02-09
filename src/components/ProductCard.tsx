import React from 'react';
import { UpdatedProductType } from '../types/product';

type Props = {
    product: UpdatedProductType;
};
export default function ProductCard({ product: { title, price, category, imgURL } }: Props) {
    return (
        <li className="cursor-pointer shadow-md rounded-lg overflow-hidden">
            <img src={imgURL} alt={title} />
            <div className="flex justify-between items-center text-xl p-2">
                <h3 className="truncate">{title}</h3>
                <p>₩{price.toLocaleString()} 원</p>
            </div>
            <p className="text-gray-300 px-2 pb-2">{category}</p>
        </li>
    );
}
