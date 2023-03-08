import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Review from '../../components/review/Review';
import { ProductType } from '../../types/product';
import { CartItemType } from '../../types/cart';
import useCart from './../../hooks/useCart';
import InputWithPlusMinus from '../../components/ui/InputWithPlusMinus';

const PRODUCT_COLORS = ['white', 'black', 'pink', 'blue'];

export default function ProductDetail() {
    const {
        state: {
            product: { name, price, category, description, imgURL },
            product,
        },
    }: {
        state: {
            product: ProductType;
        };
    } = useLocation();
    const [isUploaded, setIsUploaded] = useState(false);
    const [cartProduct, setCartProduct] = useState<CartItemType>({
        quantity: 1,
        color: 'black',
        size: 'S',
        productId: product.id,
    });
    const { addToCart } = useCart();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setIsUploaded(true);
        addToCart.mutate(cartProduct, {
            onSuccess: () => setTimeout(() => setIsUploaded(false), 3000),
        });
    };

    const handleSize = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        const sizeBtns = document.querySelectorAll('.sizeBtn');
        sizeBtns.forEach((btn) => btn.classList.remove('bg-gray-700'));
        const target = e.target as HTMLSpanElement;
        target.classList.add('bg-gray-700');
        setCartProduct((prev) => ({
            ...prev,
            size: target.textContent!,
        }));
    };

    const handleColor = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        const colorBtns = document.querySelectorAll('.colorBtn');
        colorBtns.forEach((btn) => btn.classList.replace('opacity-100', 'opacity-50'));
        const target = e.target as HTMLSpanElement;
        target.classList.replace('opacity-50', 'opacity-100');
        setCartProduct((prev) => ({
            ...prev,
            color: target.id,
        }));
    };

    return (
        <section>
            <p className="text-center fontbold text-2xl py-4">{category}</p>
            <div className="flex flex-col md:flex-row md:justify-center gap-5 p-4">
                <div className="w-full basis-7/12">
                    <img className="w-full" src={imgURL} alt={name} />
                </div>
                <article className="w-full basis-5/12 text-center">
                    <h1 className="text-3xl font-bold">{name}</h1>
                    <p className="text-2xl font-semibold border-b border-gray-300 pb-3">₩{price!.toLocaleString()}원</p>
                    <p className="text-lg py-3">{description}</p>
                    <span>수량: </span>
                    <InputWithPlusMinus type="productDetail" quantity={1} />
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
                            id={PRODUCT_COLORS[2]}
                        ></span>
                        <span
                            className="colorBtn inline-block w-5 h-5 bg-blue-300 opacity-50 cursor-pointer"
                            onClick={handleColor}
                            id={PRODUCT_COLORS[3]}
                        ></span>
                        <span
                            className="colorBtn inline-block w-5 h-5 bg-white opacity-50 cursor-pointer"
                            onClick={handleColor}
                            id={PRODUCT_COLORS[0]}
                        ></span>
                        <span
                            className="colorBtn inline-block w-5 h-5 bg-black opacity-50 cursor-pointer"
                            onClick={handleColor}
                            id={PRODUCT_COLORS[1]}
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
