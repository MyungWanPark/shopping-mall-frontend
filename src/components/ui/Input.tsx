import React, { ChangeEvent } from 'react';

type Props = {
    accept?: string;
    type: string;
    name: string;
    value?: string;
    placeholder?: string;
    onChange(e: ChangeEvent): void;
    required?: boolean;
};

export default function Input({ type, name, value, accept, placeholder, onChange, required }: Props) {
    return (
        <input
            className="p-2 outline-none border border-gray-200"
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            required={required}
        />
    );
}
