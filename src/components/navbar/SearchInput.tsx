import React, { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

export default function SearchInput() {
    const [keyword, setKeyword] = useState<string>('');
    const navigate = useNavigate();

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        navigate(`/products?keyword=${keyword}`);
    };

    return (
        <form className="flex ml-10 border border-brand rounded-full overflow-hidden w-1/3" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Search product..."
                onChange={handleInput}
                value={keyword}
                className="outline-none py-2 px-4 basis-5/6"
            />
            <button className="border-l-2 px-2 basis-1/6">
                <BsSearch className="mx-auto" />
            </button>
        </form>
    );
}
