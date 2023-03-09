import React from 'react';
import { CartProductType } from '../../types/product';
import { BsTrash } from 'react-icons/bs';
import { CartItemType } from '../../types/cart';
// import useCart from '../../hooks/useCart';
import useProducts from './../../hooks/useProducts';
import InputWithPlusMinus from './../ui/InputWithPlusMinus';
import useCart from './../../hooks/useCart';

type Props = {
    cartItem: CartItemType;
};

const ICON_CLASS = 'cursor-pointer transition-all hover:text-brand hover:scale-105';

export default function CartItem({ cartItem }: Props) {
    const {
        getProductInfo: { isLoading, error, data: productInfo },
    } = useProducts({ productId: cartItem.productId });
    console.log(`productInfo in CartItem = ${JSON.stringify(productInfo)}`);
    const { deleteCartItem } = useCart();
    const handleDelete = (e: React.MouseEvent) => {
        deleteCartItem.mutate(cartItem.productId!);
    };
    return (
        <li className="flex justify-between px-4 py-2">
            <img className="w-20 md:w-32 rounded-lg" src={productInfo?.imgURL} alt={productInfo?.name} />
            <section className="flex flex-1 ml-3 text-md md:text-lg">
                <article className="flex flex-col justify-center basis-3/5">
                    <p className="flex w-48 justify-between font-semibold">
                        <span>제품명:</span>
                        <span className="text-center basis-2/3">{productInfo?.name}</span>
                    </p>
                    <p className="flex w-48 justify-between">
                        <span className="basis-1/7">사이즈:</span>
                        <span className="text-center basis-2/3 text-brand">{cartItem.size}</span>
                    </p>
                    <p className="flex w-48 justify-between">
                        <span>가격:</span>
                        <span className="text-center basis-2/3">₩ {productInfo?.price!.toLocaleString()}</span>
                    </p>
                </article>
                <article className="flex justify-center items-center">
                    <InputWithPlusMinus type="cart" cartProduct={cartItem} />
                    <BsTrash className={`${ICON_CLASS} ml-2`} onClick={handleDelete} />
                </article>
            </section>
        </li>
    );
}
