import React from 'react';
type Props = {
    text: string;
    onClick(): void;
};

export default function Button({ text, onClick }: Props) {
    return (
        <button className="bg-brand py-2 px-4 rounded-md text-white" onClick={onClick}>
            {text}
        </button>
    );
}
