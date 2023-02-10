import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { AiFillPlusCircle } from 'react-icons/ai';
import { FaEquals } from 'react-icons/fa';
import { useAuthContext } from '../context/AuthContext';
import { getCart } from '../api/firebase';
import CartItem from './../components/CartItem';
import { CartProductType } from '../types/product';
import PriceCard from './../components/PriceCard';
import Button from '../components/ui/Button';

const SHIPPING_FEE = 3000;

export default function MyCart() {
    const {
        user: { uid },
    } = useAuthContext();
    const {
        isLoading,
        error,
        data: products,
    }: { isLoading: boolean; error: any; data?: CartProductType[] } = useQuery(['cart'], () => getCart(uid));

    if (isLoading) return <p>is Loading...</p>;
    if (error) return <p>network error...</p>;
    const hasProduct = products && products.length > 0;
    const totalPrice = products && products.reduce((prev, curr) => prev + curr.price * curr.quantity, 0);

    return (
        <section className="p-8">
            <p className="text-center font-bold text-2xl py-3 border-b border-gray-300">내 장바구니</p>
            {!hasProduct && <p>장바구니에 상품이 없습니다.</p>}
            {hasProduct && (
                <>
                    <ul className="border-b border-gray-300 py-4">
                        {products.map((product) => (
                            <CartItem key={product.id} product={product} uid={uid} />
                        ))}
                    </ul>
                    <div className="flex justify-between items-center p-4">
                        <PriceCard text={'상품 총액'} price={totalPrice} />
                        <AiFillPlusCircle className="shrink-0" />
                        <PriceCard text={'배송료'} price={SHIPPING_FEE} />
                        <FaEquals className="shrink-0" />
                        <PriceCard text={'총 합계'} price={totalPrice! + SHIPPING_FEE} />
                    </div>
                    <Button text={'주문하기'} />
                </>
            )}
        </section>
    );
}
