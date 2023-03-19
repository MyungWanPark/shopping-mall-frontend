import React from 'react';
import { CartItemType } from '../../types/cart';
import { handleText } from '../../utils/product/detail';

type Props = {
    text: string;
    setState: React.Dispatch<React.SetStateAction<CartItemType>>;
    setField: string;
    customStyle?: string;
};

export default function TextBox({ text, setState, setField, customStyle }: Props) {
    const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
        handleText({ e, setState, setField });
    };

    return (
        <div
            className={`flex justify-center items-center border overflow-hidden border-black cursor-pointer mr-3 ${customStyle}`}
        >
            <span className={`inline-block text-center textBtn transition-all w-full`} onClick={handleClick}>
                {text}
            </span>
        </div>
    );
}
