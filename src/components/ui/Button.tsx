import React from 'react';
type Props = {
    text: string;
    onClick?(): void;
    isDisabled?: boolean;
};

export default function Button({ text, onClick, isDisabled }: Props) {
    return (
        <button className="bg-brand py-2 px-4 rounded-md text-white" onClick={onClick} disabled={isDisabled}>
            {text}
        </button>
    );
}
