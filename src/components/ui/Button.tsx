import React from 'react';
type Props = {
    text: string;
    onClick?(e?: React.MouseEvent): void;
    isDisabled?: boolean;
};

export default function Button({ text, onClick, isDisabled }: Props) {
    return (
        <button
            className="bg-brand py-2 px-4 rounded-md w-full text-white hover:brightness-110"
            onClick={onClick}
            disabled={isDisabled}
        >
            {text}
        </button>
    );
}
