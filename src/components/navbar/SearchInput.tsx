import React, { useState, useEffect } from 'react';
import { BsSearch } from 'react-icons/bs';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useProducts from '../../hooks/useProducts';
import RealTimeResult from './RealTimeResult';
import { ProductType } from '../../types/product';

export default function SearchInput() {
    const [searchParams, setSearchParams] = useSearchParams();
    const keyword = searchParams.get('keyword') || ('' as string);

    const [text, setText] = useState<string>(keyword);
    const [products, setProducts] = useState<ProductType[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const {
        getProducts: { data: realTimeData },
    } = useProducts({ keyword: text });

    useEffect(() => {
        if (text.length === 0) {
            setProducts([]);
            return;
        }

        if (realTimeData && realTimeData.products) {
            setProducts(realTimeData.products.length === 0 ? [] : realTimeData.products);
        }
    }, [realTimeData, text]);

    useEffect(() => {
        setIsOpen(false);
        const handleClickOutside = (e: MouseEvent) => {
            if (!(e.target as HTMLElement).closest('.search-container')) {
                setIsOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const navigate = useNavigate();

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        // e.preventDefault();
        setText(e.target.value);
        setIsOpen(true);
    };

    const handleFocus = () => {
        if (text.trim().length > 0) {
            setIsOpen(true);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        navigate(`/products?keyword=${text}`);
    };

    return (
        <section className="relative search-container">
            <form
                className="flex basis-4/6 mx-2 border border-brand rounded-full overflow-hidden w-full lg:basis-auto"
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    placeholder="Search name..."
                    onChange={handleInput}
                    onFocus={handleFocus}
                    value={text}
                    className="outline-none text-sm w-full py-2 px-4 basis-5/6 lg:text-lg"
                />
                <button className="bg-gray-200 border-l-1 px-2 basis-1/6 ">
                    <BsSearch className="mx-auto" />
                </button>
            </form>
            {isOpen && setProducts.length > 0 && <RealTimeResult products={products} setIsOpen={setIsOpen} />}
        </section>
    );
}
