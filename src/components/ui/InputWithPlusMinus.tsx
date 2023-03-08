import React from 'react';
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from 'react-icons/ai';
import { CartItemType } from '../../types/cart';

const ICON_CLASS = 'cursor-pointer transition-all hover:text-brand hover:scale-105';

type Props = {
    type: 'productDetail' | 'cart';
    quantity: number;
    setCartProduct?: React.Dispatch<React.SetStateAction<CartItemType>>;
    cartProduct?: CartItemType;
};

export default function InputWithPlusMinus({ type, setCartProduct, cartProduct }: Props) {
    const handleMinus = (e: React.MouseEvent) => {
        if (cartProduct?.quantity! < 2) return;
        setCartProduct!((prev) => ({ ...prev, quantity: prev.quantity! - 1 }));
        /* addOrUpdateCart.mutate({
            ...product,
            quantity: quantity - 1,
        }); */
    };
    const handlePlus = (e: React.MouseEvent) => {
        setCartProduct!((prev) => ({ ...prev, quantity: prev.quantity! + 1 }));

        /* addOrUpdateCart.mutate({
            ...product,
            quantity: quantity + 1,
        }); */
    };

    return (
        <article className="flex justify-center items-center">
            <AiOutlineMinusSquare className={ICON_CLASS} onClick={handleMinus} />
            <span className="mx-1">{cartProduct?.quantity}</span>
            <AiOutlinePlusSquare className={ICON_CLASS} onClick={handlePlus} />
        </article>
    );
}
