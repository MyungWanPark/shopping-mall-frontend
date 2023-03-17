import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductType } from '../../types/product';

type Props = {
    product: ProductType;
};
export default function ProductCard({ product: { name, price, category, imgURL, id }, product }: Props) {
    const navigate = useNavigate();
    const handleClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        navigate(`/products/${id}`);
    };
    return (
        <li
            className="cursor-pointer shadow-md rounded-lg overflow-hidden transition-all hover:scale-105"
            onClick={handleClick}
        >
            <img src={imgURL} alt={name} className="h-4/5 w-full" />
            <div className="flex justify-between items-center text-xl p-2">
                <h3 className="truncate">{name}</h3>
                <p>₩{price!.toLocaleString()} 원</p>
            </div>
            <p className="text-gray-300 px-2 pb-2">{category}</p>
        </li>
    );
}
