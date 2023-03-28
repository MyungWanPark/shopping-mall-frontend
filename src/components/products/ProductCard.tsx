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
            className="cursor-pointer shadow-md rounded-lg font-Raleway overflow-hidden transition-all hover:scale-105"
            onClick={handleClick}
        >
            <img src={imgURL} alt={name} className="h-112 tablet:h-128 w-full lg:h-104" />
            <div className="flex justify-between items-center text-xs sm:text-md p-2 lg:text-lg">
                <h3 className="truncate">{name}</h3>
                <p>₩{price!.toLocaleString()} 원</p>
            </div>
            <p className="text-gray-300 px-2 pb-2 text-xs sm:text-md">{category}</p>
        </li>
    );
}
