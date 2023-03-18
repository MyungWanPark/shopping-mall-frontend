import React from 'react';
type Props = {
    text: string;
    onClick?(e?: React.MouseEvent): void;
    isDisabled?: boolean;
    bgColor?: string;
};

export default function Button({ text, onClick, isDisabled, bgColor = 'bg-brand' }: Props) {
    return (
        <button
            className={`${bgColor} lg:bg-brand py-2 px-4 rounded-md text-white hover:brightness-110`}
            onClick={onClick}
            disabled={isDisabled}
        >
            {text}
        </button>
    );
}
