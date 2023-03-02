import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../../components/ui/Button';
import { v4 as uuid } from 'uuid';
// import useCart from '../../hooks/useCart';
import Review from '../../components/review/Review';

export default function ProductDetail() {
    const {
        state: {
            product: { title, price, category, description, options, imgURL },
            product,
        },
    } = useLocation();
    const [isUploaded, setIsUploaded] = useState(false);
    // const { addOrUpdateCart } = useCart();
    const [selectedItem, setSelectedItem] = useState<string>(options && options[0]);
    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedItem(e.target.value);
    };
    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setIsUploaded(true);
        /* addOrUpdateCart.mutate(
            { ...product, option: selectedItem, quantity: 1 },
            {
                onSuccess: () => setTimeout(() => setIsUploaded(false), 3000),
            }
        ); */
    };

    const handleSize = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        const sizeBtns = document.querySelectorAll('.sizeBtn');
        sizeBtns.forEach((btn) => btn.classList.remove('bg-gray-700'));
        (e.target as HTMLSpanElement).classList.add('bg-gray-700');
    };

    const handleColor = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        const colorBtns = document.querySelectorAll('.colorBtn');
        colorBtns.forEach((btn) => btn.classList.replace('opacity-100', 'opacity-50'));
        (e.target as HTMLSpanElement).classList.replace('opacity-50', 'opacity-100');
    };

    return (
        <section>
            <p className="text-center fontbold text-2xl py-4">{category}</p>
            <div className="flex flex-col md:flex-row md:justify-center gap-5 p-4">
                <div className="w-full basis-7/12">
                    <img className="w-full" src={imgURL} alt={title} />
                </div>
                <article className="w-full basis-5/12 text-center">
                    <h1 className="text-3xl font-bold">{title}</h1>
                    <p className="text-2xl font-semibold border-b border-gray-300 pb-3">₩{price.toLocaleString()}원</p>
                    <p className="text-lg py-3">{description}</p>
                    <label htmlFor="options" className="text-center">
                        옵션:
                    </label>
                    <select
                        name=""
                        id="options"
                        onChange={handleSelect}
                        value={selectedItem}
                        className="ml-2 w-96 border border-dashed border-brand outline-none mb-5"
                    >
                        {options.map((option: string) => (
                            <option className="text-center" key={uuid()}>
                                {option}
                            </option>
                        ))}
                    </select>
                    <div>
                        <span
                            className="sizeBtn inline-block w-5 h-5 border border-black cursor-pointer"
                            onClick={handleSize}
                        >
                            S
                        </span>
                        <span
                            className="sizeBtn inline-block w-5 h-5 border border-black cursor-pointer"
                            onClick={handleSize}
                        >
                            M
                        </span>
                        <span
                            className="sizeBtn inline-block w-5 h-5 border border-black cursor-pointer"
                            onClick={handleSize}
                        >
                            L
                        </span>
                        <span
                            className="sizeBtn inline-block w-5 h-5 border border-black cursor-pointer"
                            onClick={handleSize}
                        >
                            XL
                        </span>
                    </div>
                    <div>
                        <span
                            className="colorBtn inline-block w-5 h-5 bg-pink-300 opacity-50 cursor-pointer"
                            onClick={handleColor}
                        ></span>
                        <span
                            className="colorBtn inline-block w-5 h-5 bg-blue-300 opacity-50 cursor-pointer"
                            onClick={handleColor}
                        ></span>
                        <span
                            className="colorBtn inline-block w-5 h-5 bg-green-300 opacity-50 cursor-pointer"
                            onClick={handleColor}
                        ></span>
                        <span
                            className="colorBtn inline-block w-5 h-5 bg-black opacity-50 cursor-pointer"
                            onClick={handleColor}
                        ></span>
                    </div>
                    <Button text="장바구니에 추가" onClick={handleClick} />
                    {isUploaded && <p>✅ 장바구니에 추가되었습니다.</p>}
                </article>
            </div>
            <Review />
        </section>
    );
}
