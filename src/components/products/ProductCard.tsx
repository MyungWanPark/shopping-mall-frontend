import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductType } from '../../types/product';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

type Props = {
    product: ProductType;
    setLoadedImg: () => void;
    showSkeleton: boolean;
};
export default function ProductCard({
    product: { name, price, category, imgURL, id },
    showSkeleton,
    setLoadedImg,
}: Props) {
    const navigate = useNavigate();
    const handleClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        navigate(`/products/${id}`);
    };
    return (
        <li
            className="relative cursor-pointer h-80 shadow-md rounded-lg font-Raleway overflow-hidden duration-300 transition-all hover:-translate-y-1"
            onClick={handleClick}
            style={{ willChange: 'transform' }}
        >
            {showSkeleton && (
                <div className="absolute inset-0 z-10">
                    <Skeleton className="rounded-2xl h-full !absolute inset-0" />
                </div>
            )}
            <div className="h-full">
                <img
                    src={imgURL}
                    alt={name}
                    // className="h-[80%] w-full object-cover"
                    className="h-64 w-full object-cover object-center"
                    style={{ willChange: 'transform' }}
                    loading="lazy"
                    onLoad={() => {
                        // console.log(`product id ${id} is loaded!`);
                        setLoadedImg();
                    }}
                />
                <div className="flex justify-between  items-center text-xs sm:text-md py-2 px-4 lg:text-lg">
                    <h3 className="truncate w-[60%]">{name}</h3>
                    <p className="text-sm">₩{price!.toLocaleString()} 원</p>
                </div>
                <p className="text-gray-400 px-2 pb-2 text-xs sm:text-md text-center">{category}</p>
            </div>
        </li>
    );
}
