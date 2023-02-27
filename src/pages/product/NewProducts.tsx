import React, { ChangeEvent, FormEvent, useState } from 'react';
import { uploadImg } from '../../api/uploader';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import useProducts from '../../hooks/useProducts';

export type ProductType = {
    title?: string;
    price?: string;
    category?: string;
    description?: string;
    options?: string;
};

export default function NewProducts() {
    const [product, setProduct] = useState<ProductType>();
    const [file, setFile] = useState<File>();
    const [isLoading, setIsLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState<string | null>();
    const { addProduct } = useProducts();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        uploadImg(file!) //
            .then((res) => {
                const imgURL = res.url;
                product &&
                    imgURL &&
                    addProduct.mutate(
                        { product, imgURL },
                        {
                            onSuccess: () => {
                                setSuccessMsg('✅ 제품등록이 완료되었습니다');
                                setTimeout(() => setSuccessMsg(null), 4000);
                            },
                        }
                    );
            })
            .then(() => setIsLoading(false));
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
        <section className="w-full text-center">
            <h1 className="text-2xl font-bold py-4">새로운 제품 등록하기</h1>
            {successMsg && <p className="my-2">{successMsg}</p>}
            <form onSubmit={handleSubmit} className="flex flex-col w-2/3 mx-auto gap-5 my-2">
                {file && <img className="w-96 mx-auto" src={URL.createObjectURL(file)} alt="local_img" />}
                <Input type="file" name="file" accept="image/*" onChange={handleChange} required />
                <Input
                    type="text"
                    name="title"
                    value={product?.title ?? ''}
                    placeholder="제품명"
                    onChange={handleChange}
                    required
                />
                <Input
                    type="number"
                    name="price"
                    value={product?.price ?? ''}
                    placeholder="제품 가격"
                    onChange={handleChange}
                    required
                />
                <Input
                    type="text"
                    name="category"
                    value={product?.category ?? ''}
                    placeholder="카테고리"
                    onChange={handleChange}
                    required
                />
                <Input
                    type="text"
                    name="description"
                    value={product?.description ?? ''}
                    placeholder="제품 설명"
                    onChange={handleChange}
                />
                <Input
                    type="text"
                    name="options"
                    value={product?.options ?? ''}
                    placeholder="옵션을 콤마로 구분해 주세요"
                    onChange={handleChange}
                    required
                />
                <Button text={isLoading ? '제품 등록중' : '제품 등록하기'} isDisabled={isLoading} />
            </form>
        </section>
    );
}
