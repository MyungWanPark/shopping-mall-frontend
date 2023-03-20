import React from 'react';
type Props = {
    text: string;
    price?: string | number;
};

export default function PriceCard({ text, price }: Props) {
    return (
        <div className="bg-gray-50 w-full p-8 rounded-2xl text-center text-lg md:mx-2">
            <p>{text}</p>
            <p className="font-bold text-brand text-2xl">{price}</p>
        </div>
    );
}
