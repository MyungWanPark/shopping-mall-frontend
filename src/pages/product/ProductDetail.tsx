import React, { useState } from 'react';
import Button from '../../components/ui/Button';
import { CartItemType } from '../../types/cart';
import useCart from './../../hooks/useCart';
import InputWithPlusMinus from '../../components/ui/InputWithPlusMinus';
import TextBox from '../../components/ui/TextBox';
import ProductColor from '../../components/ui/ProductColor';
import useProducts from './../../hooks/useProducts';
import { useAuthContext } from '../../context/AuthContext';

const PRODUCT_COLORS = ['pink', 'blue', 'white', 'black'];

export default function ProductDetail() {
    const paths = window.location.pathname.split('/');
    const productId = parseInt(paths[paths.length - 1]);
    const {
        getProductInfo: { isLoading, data: product },
    } = useProducts({ productId });
    const { user } = useAuthContext();
    let name: string, price: number, category: string, description: string, imgURL: string;
    if (product) {
        name = product.name!;
        price = product.price!;
        category = product.category!;
        description = product.description!;
        imgURL = product.imgURL!;
    }

    const [isUploaded, setIsUploaded] = useState(false);
    const [cartProduct, setCartProduct] = useState<CartItemType>({
        quantity: 1,
        color: 'black',
        size: 'S',
        productId,
    });
    const { addToCart } = useCart();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (!user) {
            return alert('로그인 진행 후 장바구니에 담을 수 있습니다.');
        }
        setIsUploaded(true);
        addToCart.mutate(cartProduct, {
            onSuccess: () => setTimeout(() => setIsUploaded(false), 3000),
        });
    };

    return (
        <>
            {product && (
                <section className="flex flex-col font-Raleway md:flex-row md:justify-center gap-12 p-4">
                    <div className="w-full basis-6/12">
                        <img className="w-full" src={imgURL!} alt={name!} />
                    </div>
                    <article className="w-full basis-6/12">
                        <p className="text-md text-gray-400">{category!}</p>
                        <h1 className="border-b border-gray-300 pb-3">
                            <span className="text-xl font-bold md:text-3xl">{name!}</span>
                            <span className="ml-10 text-lg font-semibold md:text-xl">
                                ₩{price!.toLocaleString()} 원
                            </span>
                        </h1>
                        <p className="text-md py-7 md:text-xl">{description!}</p>
                        <div className="flex items-center mb-3">
                            <span className="mr-5 w-12">SIZE</span>
                            <TextBox text="S" setState={setCartProduct} setField="size" customStyle="w-10 rounded-md" />
                            <TextBox text="M" setState={setCartProduct} setField="size" customStyle="w-10 rounded-md" />
                            <TextBox text="L" setState={setCartProduct} setField="size" customStyle="w-10 rounded-md" />
                            <TextBox
                                text="XL"
                                setState={setCartProduct}
                                setField="size"
                                customStyle="w-10 rounded-md"
                            />
                        </div>
                        <div className="flex items-center h-10 mb-2">
                            <span className="mr-5 w-12">COLOR</span>
                            <ProductColor id={PRODUCT_COLORS[0]} setState={setCartProduct} colorClass="bg-pink-300" />
                            <ProductColor id={PRODUCT_COLORS[1]} setState={setCartProduct} colorClass="bg-blue-300" />
                            <ProductColor id={PRODUCT_COLORS[2]} setState={setCartProduct} colorClass="bg-white" />
                            <ProductColor id={PRODUCT_COLORS[3]} setState={setCartProduct} colorClass="bg-black" />
                        </div>
                        <div className="flex mb-3 items-center">
                            <span className="text-md w-12 mr-5">수량: </span>
                            <InputWithPlusMinus
                                type="productDetail"
                                setCartProduct={setCartProduct}
                                cartProduct={cartProduct}
                                fontSize="text-lg"
                            />
                        </div>
                        <Button text="장바구니에 추가" onClick={handleClick} />
                        {isUploaded && <p>✅ 장바구니에 추가되었습니다.</p>}
                    </article>
                </section>
            )}
        </>
    );
}
