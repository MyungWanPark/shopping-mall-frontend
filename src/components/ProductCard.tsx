import React from 'react';
import { UpdatedProductType } from '../types/product';

type Props = {
    product: UpdatedProductType;
};
export default function ProductCard({ product: { title, price, category, imgURL } }: Props) {
    return (
        <li>
            <img src={imgURL} alt={title} />
            <div>
                <h3>{title}</h3>
                <p>₩{price} 원</p>
            </div>
            <p>{category}</p>
        </li>
    );
}
