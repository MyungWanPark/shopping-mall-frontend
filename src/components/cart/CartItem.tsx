import React from 'react';
import { CartProductType } from '../../types/product';
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';
import useCart from '../../hooks/useCart';

type Props = {
    product: CartProductType;
};

const ICON_CLASS = 'cursor-pointer transition-all hover:text-brand hover:scale-105';

export default function CartItem({ product, product: { title, price, option, id, imgURL, quantity } }: Props) {
    const { addOrUpdateCart, removeFromCart } = useCart();
    const handleMinus = (e: React.MouseEvent) => {
        if (quantity < 2) return;
        addOrUpdateCart.mutate({
            ...product,
            quantity: quantity - 1,
        });
    };
    const handlePlus = (e: React.MouseEvent) => {
        addOrUpdateCart.mutate({
            ...product,
            quantity: quantity + 1,
        });
    };
    const handleDelete = (e: React.MouseEvent) => {
        removeFromCart.mutate(id);
    };
    return (
        <li className="flex justify-between px-4 py-2">
            <img className="w-20 md:w-32 rounded-lg" src={imgURL} alt={title} />
            <section className="flex flex-1 ml-3 text-md md:text-lg">
                <article className="flex flex-col justify-center basis-3/5">
                    <p className="flex w-48 justify-between font-semibold">
                        <span>제품명:</span>
                        <span className="text-center basis-2/3">{title}</span>
                    </p>
                    <p className="flex w-48 justify-between">
                        <span className="basis-1/7">사이즈:</span>
                        <span className="text-center basis-2/3 text-brand">{option}</span>
                    </p>
                    <p className="flex w-48 justify-between">
                        <span>가격:</span>
                        <span className="text-center basis-2/3">₩ {price.toLocaleString()}</span>
                    </p>
                </article>
                <article className="flex justify-center items-center">
                    <AiOutlineMinusSquare className={ICON_CLASS} onClick={handleMinus} />
                    <span className="mx-1">{quantity}</span>
                    <AiOutlinePlusSquare className={ICON_CLASS} onClick={handlePlus} />
                    <BsTrash className={`${ICON_CLASS} ml-2`} onClick={handleDelete} />
                </article>
            </section>
        </li>
    );
}
