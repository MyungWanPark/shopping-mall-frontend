import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { uploadImg } from '../../api/uploader';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { v4 as uuid } from 'uuid';
import { ProductType } from '../../types/product';
import { useNavigate } from 'react-router-dom';
import useProducts from './../../hooks/useProducts';

const options = ['men', 'women', 'bag', 'shoes'];

export default function NewProducts() {
    const [product, setProduct] = useState<ProductType>();
    const [file, setFile] = useState<File>();
    const [isLoading, setIsLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState<string | null>();
    const [showingImgURL, setShowingImgURL] = useState<string>();
    const { addNewProduct } = useProducts({});

    const [selectedCategory, setSelectedCategory] = useState<string>(options && options[0]);
    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.target.value);
    };

    const navigate = useNavigate();

    useEffect(() => {
        if (file) {
            setShowingImgURL(URL.createObjectURL(file));
        }
    }, [file]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        uploadImg(file!) //
            .then((res) => {
                const imgURL = res.url;
                product &&
                    imgURL &&
                    addNewProduct.mutate(
                        { product: { ...product, category: selectedCategory }, imgURL },
                        {
                            onSuccess: () => {
                                setSuccessMsg('✅ 제품등록이 완료되었습니다');
                                setTimeout(() => setSuccessMsg(null), 4000);
                            },
                        }
                    );
            })
            .then(() => setIsLoading(false))
            .then(() => navigate('/'));
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
        <section className="w-full text-center font-Raleway">
            <h1 className="text-2xl font-bold py-4">새로운 제품 등록하기</h1>
            <form onSubmit={handleSubmit} className="flex flex-col px-4 mx-auto w-full gap-5 my-2 lg:w-2/3 lg:px-0">
                {showingImgURL && <img className="w-96 mx-auto" src={showingImgURL} alt="local_img" />}
                <Input
                    type="file"
                    name="file"
                    accept="image/*"
                    onChange={handleChange}
                    required
                    inputMeta={{ id: 'file', labelName: '파일' }}
                />
                <Input
                    type="text"
                    name="name"
                    value={product?.name ?? ''}
                    placeholder="제품명"
                    onChange={handleChange}
                    required
                    inputMeta={{ id: 'productName', labelName: '제품명' }}
                />
                <Input
                    type="number"
                    name="price"
                    value={product?.price?.toString() ?? ''}
                    placeholder="제품 가격"
                    onChange={handleChange}
                    required
                    inputMeta={{ id: 'price', labelName: '가격' }}
                />
                <div className="flex items-center">
                    <label htmlFor="options" className="text-center basis-1/6">
                        카테고리:
                    </label>
                    <select
                        id="options"
                        name="category"
                        onChange={handleSelect}
                        value={selectedCategory}
                        className="basis-5/6 border border-dashed border-brand outline-none p-2"
                    >
                        {options.map((option: string) => (
                            <option className="text-center" key={uuid()}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
                <Input
                    type="text"
                    name="description"
                    value={product?.description ?? ''}
                    placeholder="제품 설명"
                    onChange={handleChange}
                    inputMeta={{ id: 'description', labelName: '제품 설명' }}
                />
                <div>
                    <Button
                        text={isLoading ? '제품 등록중' : '제품 등록하기'}
                        isDisabled={isLoading}
                        // customCss="w-20 "
                    />
                </div>
            </form>
            {successMsg && <p className="my-2">{successMsg}</p>}
        </section>
    );
}
