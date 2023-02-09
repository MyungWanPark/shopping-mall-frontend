import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../components/ui/Button';
import { v4 as uuid } from 'uuid';

export default function ProductDetail() {
    const {
        state: {
            product: { title, price, category, description, options, id, imgURL },
        },
    } = useLocation();
    const [selectedItem, setSelectedItem] = useState<string>(options && options[0]);
    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedItem(e.target.value);
    };
    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {};

    return (
        <section>
            <p className="text-center fontbold text-2xl py-4">{category}</p>
            <div className="flex flex-col md:flex-row md:justify-center gap-5 p-4">
                <div className="w-full basis-7/12">
                    <img className="w-full" src={imgURL} alt={title} />
                </div>
                <article className="w-full basis-5/12 text-center">
                    <h1 className="text-3xl font-bold">{title}</h1>
                    <p className="text-2xl font-semibold border-b border-gray-300 pb-3">₩{price.toLocaleString()}원</p>
                    <p className="text-lg py-3">{description}</p>
                    <label htmlFor="options" className="text-center">
                        옵션:
                    </label>
                    <select
                        name=""
                        id="options"
                        onChange={handleSelect}
                        value={selectedItem}
                        className="ml-2 w-96 border border-dashed border-brand outline-none mb-5"
                    >
                        {options.map((option: string) => (
                            <option className="text-center" key={uuid()}>
                                {option}
                            </option>
                        ))}
                    </select>
                    <Button text="장바구니에 추가" onClick={handleClick} />
                </article>
            </div>
        </section>
    );
}
