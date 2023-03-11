import React from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import { FaEquals } from 'react-icons/fa';
import CartItem from '../../components/cart/CartItem';
import PriceCard from '../../components/cart/PriceCard';
import Button from '../../components/ui/Button';
import useCart from './../../hooks/useCart';
import { useNavigate } from 'react-router-dom';
import useOrder from './../../hooks/useOrder';

const SHIPPING_FEE = 3000;

export default function MyCart() {
    const {
        getCart: { isLoading, error, data: cartItems },
    } = useCart();
    const { createOrder } = useOrder();
    const cartItemIdsToOrder = cartItems?.filter((cartItem) => cartItem.isSelected).map((cartItem) => cartItem.id);
    const navigate = useNavigate();

    const handleOrder = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        createOrder.mutate({
            cartItemIds: JSON.stringify(cartItemIdsToOrder),
        });
        alert('주문이 완료되었습니다.');
        navigate('/');
    };

    if (isLoading) return <p>is Loading...</p>;
    if (error) return <p>network error...</p>;
    const hasProduct = cartItems && cartItems.length > 0;
    const totalPrice =
        cartItems &&
        cartItems
            .filter((cartItem) => cartItem.isSelected)
            .reduce((prev, curr) => prev + curr.totalPricePerProduct!, 0);
    return (
        <section className="p-8">
            <p className="text-center font-bold text-2xl py-3 border-b border-gray-300">내 장바구니</p>
            {!hasProduct && <p>장바구니에 상품이 없습니다.</p>}
            {hasProduct && (
                <>
                    <ul className="border-b border-gray-300 py-4">
                        {cartItems.map((cartItem) => (
                            <CartItem key={cartItem.id} cartItem={cartItem} />
                        ))}
                    </ul>
                    <div className="flex justify-between items-center p-4">
                        <PriceCard text={'상품 총액'} price={`${totalPrice?.toLocaleString()} 원`} />
                        <AiFillPlusCircle className="shrink-0" />
                        <PriceCard text={'배송료'} price={`${SHIPPING_FEE.toLocaleString()} 원`} />
                        <FaEquals className="shrink-0" />
                        <PriceCard text={'총 합계'} price={`${(totalPrice! + SHIPPING_FEE).toLocaleString()} 원`} />
                    </div>
                    <Button onClick={handleOrder} text={'주문하기'} />
                </>
            )}
        </section>
    );
}
