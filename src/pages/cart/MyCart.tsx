import React, { useEffect, useState } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import { FaEquals } from 'react-icons/fa';
import CartItem from '../../components/cart/CartItem';
import PriceCard from '../../components/cart/PriceCard';
import Button from '../../components/ui/Button';
import useCart from './../../hooks/useCart';
import { useNavigate } from 'react-router-dom';
import useOrder from './../../hooks/useOrder';
import { useAuthContext } from '../../context/AuthContext';
import { User } from '../../types/user';
import { CartItemType } from '../../types/cart';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const SHIPPING_FEE = 3000;

export default function MyCart() {
    const {
        getCart: { isLoading, error, data },
    } = useCart();
    const { user }: { user: User } = useAuthContext();
    const reduxCartItems = useSelector((state: RootState) => state.cart.items);
    const [cartItems, setCartItems] = useState(reduxCartItems);
    // let cartItems = reduxCartItems;

    useEffect(() => {
        setCartItems(reduxCartItems);
        if (user && data) {
            setCartItems(data!);
        }
    }, [user, reduxCartItems, data]);

    const { createOrder } = useOrder();
    const cartItemIdsToOrder = cartItems?.filter((cartItem) => cartItem.isSelected).map((cartItem) => cartItem.id);
    const navigate = useNavigate();

    const handleOrder = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (!user) {
            alert('주문하기 위해선 로그인이 필요합니다.');
            return;
        }
        createOrder.mutate({
            cartItemIds: JSON.stringify(cartItemIdsToOrder),
        });
        alert('주문이 완료되었습니다.');
        navigate('/');
    };

    const hasProduct = cartItems && cartItems.length > 0;
    const totalPrice =
        cartItems &&
        cartItems
            .filter((cartItem) => cartItem.isSelected)
            .reduce((prev, curr) => prev + curr.totalPricePerProduct!, 0);

    if (error) return <p>network error...</p>;
    if (isLoading) return <p>isLoading...</p>;

    return (
        <section className="p-8">
            <p className="text-center text-2xl pb-5 border-b border-gray-300">Shopping Cart</p>
            <p className="flex text-center mt-2 text-xs lg:text-lg">
                <span className="inline-block basis-1/12">CHECK</span>
                <span className="inline-block basis-6/12">PRODUCT</span>
                <span className="hidden md:inline-block basis-1/12">PRICE</span>
                <span className="inline-block basis-3/12 md:basis-2/12">QUANTITY</span>
                <span className="hidden md:inline-block basis-1/12">SUBTOTAL</span>
                <span className="inline-block basis-2/12 md:basis-1/12">DELETE</span>
            </p>
            {!hasProduct && <p className="text-center mt-10">장바구니에 상품이 없습니다.</p>}
            {hasProduct && (
                <div className="flex flex-col">
                    <ul className="border-b border-gray-300 py-4">
                        {cartItems!.map((cartItem, id) => (
                            <CartItem key={id} cartItem={cartItem} user={user} />
                        ))}
                    </ul>
                    <div className="flex flex-col w-full justify-between items-center p-4 md:flex-row">
                        <PriceCard text={'상품 총액'} price={`${totalPrice?.toLocaleString()} 원`} />
                        <AiFillPlusCircle className="shrink-0 my-3" />
                        <PriceCard text={'배송료'} price={`${SHIPPING_FEE.toLocaleString()} 원`} />
                        <FaEquals className="shrink-0 my-3" />
                        <PriceCard text={'총 합계'} price={`${(totalPrice! + SHIPPING_FEE).toLocaleString()} 원`} />
                    </div>
                    <Button onClick={handleOrder} text={'주문하기'} />
                </div>
            )}
        </section>
    );
}
