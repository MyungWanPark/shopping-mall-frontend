import React from 'react';
import { CartProductType } from '../types/product';
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';
import { addOrUpdateCart, removeFromCart } from '../api/firebase';

type Props = {
    product: CartProductType;
    uid: string;
};

export default function CartItem({ product, product: { title, price, option, id, imgURL, quantity }, uid }: Props) {
    const handleMinus = (e: React.MouseEvent) => {
        if (quantity < 2) return;
        addOrUpdateCart(uid, {
            ...product,
            quantity: quantity - 1,
        });
    };
    const handlePlus = (e: React.MouseEvent) => {
        addOrUpdateCart(uid, {
            ...product,
            quantity: quantity + 1,
        });
    };
    const handleDelete = (e: React.MouseEvent) => {
        removeFromCart(uid, id);
    };
    return (
        <li>
            <img src={imgURL} alt={title} />
            <div>
                <p>{title}</p>
                <p>{option}</p>
                <div>
                    <AiOutlineMinusSquare onClick={handleMinus} />
                    <span>{quantity}</span>
                    <AiOutlinePlusSquare onClick={handlePlus} />
                    <BsTrash onClick={handleDelete} />
                </div>
            </div>
        </li>
    );
}
