import React, { useState, useEffect } from 'react';
import { BsSearch } from 'react-icons/bs';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function SearchInput() {
    const [text, setText] = useState<string>('');
    const [searchParams, setSearchParams] = useSearchParams();
    const keyword = searchParams.get('keyword') as string;
    useEffect(() => setText(keyword || ''), [keyword]);

    const navigate = useNavigate();

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        navigate(`/products?keyword=${text}`);
    };

    return (
        <form
            className="flex basis-4/6 mx-2 border border-brand rounded-full overflow-hidden w-full lg:basis-auto"
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                placeholder="Search name of product..."
                onChange={handleInput}
                value={text}
                className="outline-none text-sm w-full py-2 px-4 basis-5/6 lg:text-lg"
            />
            <button className="bg-gray-200 border-l-1 px-2 basis-1/6 ">
                <BsSearch className="mx-auto" />
            </button>
        </form>
    );
}
