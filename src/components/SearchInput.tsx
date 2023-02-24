import React, { useState } from 'react';
import { BsSearch } from 'react-icons/bs';

export default function SearchInput() {
    const [keyword, setKeyword] = useState<string>('');
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    };
    return (
        <div className="flex ml-10 border border-brand rounded-full overflow-hidden w-1/3">
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
        </div>
    );
}
