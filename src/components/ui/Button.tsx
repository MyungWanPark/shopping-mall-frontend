import React from 'react';
type Props = {
    text: string;
    onClick?(e?: React.MouseEvent): void;
    isDisabled?: boolean;
    customCss?: string;
};

export default function Button({ text, onClick, isDisabled, customCss = 'bg-brand' }: Props) {
    return (
        <button
            className={` lg:bg-brand py-2 px-4 rounded-md text-white hover:brightness-110 ${customCss}`}
            onClick={onClick}
            disabled={isDisabled}
        >
            {text}
        </button>
    );
}
