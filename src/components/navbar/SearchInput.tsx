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
        <form className="flex ml-10 border border-brand rounded-full overflow-hidden w-1/3" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Search name of product..."
                onChange={handleInput}
                value={text}
                className="outline-none py-2 px-4 basis-5/6"
            />
            <button className="border-l-2 px-2 basis-1/6">
                <BsSearch className="mx-auto" />
            </button>
        </form>
    );
}
