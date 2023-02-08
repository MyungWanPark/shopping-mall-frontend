import React, { ChangeEvent, FormEvent, useState } from 'react';
import { uploadImg } from '../api/uploader';
import Button from './../components/ui/Button';

type Product = {
    title?: string;
    price?: number;
    category?: string;
    description?: string;
    options?: string;
};

export default function NewProducts() {
    const [product, setProduct] = useState<Product>();
    const [file, setFile] = useState<File>();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        uploadImg(file!).then(console.log);
    };
    const handleChange = (e: ChangeEvent) => {
        const { name, value, files } = e.target as HTMLInputElement;
        if (name === 'file') {
            setFile(files! && files[0]);
            return;
        }
        setProduct((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    return (
        <section>
            <form onSubmit={handleSubmit}>
                {file && <img src={URL.createObjectURL(file)} alt="local_img" />}
                <input type="file" name="file" accept="image/*" onChange={handleChange} required />
                <input
                    type="text"
                    name="title"
                    value={product?.title ?? ''}
                    placeholder="제품명"
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="price"
                    value={product?.price ?? ''}
                    placeholder="제품 가격"
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="category"
                    value={product?.category ?? ''}
                    placeholder="카테고리"
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="description"
                    value={product?.description ?? ''}
                    placeholder="제품 설명"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="options"
                    value={product?.options ?? ''}
                    placeholder="옵션을 콤마로 구분해 주세요"
                    onChange={handleChange}
                    required
                />
                <Button text="제품 등록하기" onClick={() => {}} />
            </form>
        </section>
    );
}
