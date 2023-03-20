import React, { ChangeEvent } from 'react';

type Props = {
    accept?: string;
    type: string;
    name: string;
    value?: string;
    placeholder?: string;
    onChange(e: ChangeEvent): void;
    required?: boolean;
    inputMeta?: {
        id: string;
        labelName: string;
    };
};

export default function Input({ type, name, value, accept, placeholder, onChange, required, inputMeta }: Props) {
    return (
        <div className="flex items-center">
            <label htmlFor={inputMeta && inputMeta.id} className="basis-1/6 text-center">
                {inputMeta && inputMeta.labelName}
            </label>
            <input
                className="p-2 outline-none border border-gray-200 basis-5/6"
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                required={required}
                id={inputMeta && inputMeta.id}
            />
        </div>
    );
}
