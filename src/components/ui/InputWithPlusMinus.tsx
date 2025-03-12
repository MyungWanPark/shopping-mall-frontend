import React from 'react';
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from 'react-icons/ai';
import { CartItemType } from '../../types/cart';
import useCart from './../../hooks/useCart';
import { User } from '../../types/user';
import { useDispatch } from 'react-redux';
import { updateItem } from '../../redux/slices/cartSlice';

const ICON_CLASS = 'cursor-pointer opacity-70 transition-all hover:text-brand hover:scale-105';

type Props = {
    type: 'productDetail' | 'cart';
    setCartProduct?: React.Dispatch<React.SetStateAction<CartItemType>>;
    cartProduct?: CartItemType;
    fontSize?: string;
    user?: User;
};

export default function InputWithPlusMinus({ type, setCartProduct, cartProduct, fontSize, user }: Props) {
    const { updateCartItem } = useCart();
    const dispatch = useDispatch();
    const handleMinus = (e: React.MouseEvent) => {
        if (cartProduct?.quantity! < 2) return;
        if (type === 'productDetail') {
            setCartProduct!((prev) => ({ ...prev, quantity: prev.quantity! - 1 }));
            return;
        }
        const updatedItem = {
            ...cartProduct,
            quantity: cartProduct?.quantity! - 1,
        };
        if (!user) {
            return dispatch(updateItem(updatedItem));
        }
        updateCartItem.mutate(updatedItem);
    };
    const handlePlus = (e: React.MouseEvent) => {
        if (type === 'productDetail') {
            setCartProduct!((prev) => ({ ...prev, quantity: prev.quantity! + 1 }));
            return;
        }

        const updatedItem = {
            ...cartProduct,
            quantity: cartProduct?.quantity! + 1,
        };
        if (!user) {
            return dispatch(updateItem(updatedItem));
        }

        updateCartItem.mutate(updatedItem);
    };

    return (
        <article className={`flex justify-center items-center ${fontSize}`}>
            <AiOutlineMinusSquare className={ICON_CLASS} onClick={handleMinus} />
            <span className="mx-1">{cartProduct?.quantity}</span>
            <AiOutlinePlusSquare className={ICON_CLASS} onClick={handlePlus} />
        </article>
    );
}
