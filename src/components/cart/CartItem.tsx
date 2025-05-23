import React from 'react';
import { CartProductType } from '../../types/product';
import { BsTrash } from 'react-icons/bs';
import { CartItemType } from '../../types/cart';
import useProducts from './../../hooks/useProducts';
import InputWithPlusMinus from './../ui/InputWithPlusMinus';
import useCart from './../../hooks/useCart';
import { User } from '../../types/user';
import { useDispatch } from 'react-redux';
import { deleteItem, updateItem } from '../../redux/slices/cartSlice';

type Props = {
    cartItem: CartItemType;
    user?: User;
};

const ICON_CLASS = 'cursor-pointer transition-all hover:text-brand hover:scale-105';

export default function CartItem({ cartItem, user }: Props) {
    const {
        getProductInfo: { isLoading, error, data: productInfo },
    } = useProducts({ productId: cartItem.productId });
    const { updateCartItem, deleteCartItem } = useCart();
    const dispatch = useDispatch();
    const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isSelected = e.target.checked;
        if (!user) {
            return dispatch(
                updateItem({
                    ...cartItem,
                    isSelected,
                })
            );
        }
        updateCartItem.mutate({
            ...cartItem,
            isSelected,
        });
    };

    const handleDelete = (e: React.MouseEvent) => {
        if (!user) {
            return dispatch(deleteItem(cartItem.productId!));
        }
        deleteCartItem.mutate(cartItem.productId!);
    };
    return (
        <li className="flex justify-between py-2 text-xs md:text-md lg:text-lg">
            <div className="flex basis-1/12 justify-center items-center">
                {/* <label htmlFor={`product${cartItem.productId}CheckBox`}>주문</label> */}
                <input
                    type="checkbox"
                    name="selectForOrder"
                    id={`product${cartItem.productId}CheckBox`}
                    onChange={handleSelect}
                    checked={cartItem.isSelected}
                />
            </div>
            <div className="flex justify-center basis-6/12">
                <img
                    className="hidden md:block md:w-48 md:h-32 rounded-lg mr-3 object-cover object-center"
                    src={productInfo?.imgURL}
                    alt={productInfo?.name}
                />
                <article className="flex flex-col justify-center basis-2/5">
                    <p className="font-semibold">
                        <span className="text-center">
                            {productInfo?.name} ({cartItem.color})
                        </span>
                    </p>
                    <p className="text-sm">
                        <span className="mr-3">사이즈:</span>
                        <span className="text-center text-brand">{cartItem.size}</span>
                    </p>
                </article>
            </div>
            <div className="hidden basis-1/12 justify-center items-center md:flex">
                <span className="inline-block">₩ {productInfo?.price!.toLocaleString()}</span>
            </div>
            <div className="basis-3/12 flex justify-center items-center md:basis-2/12">
                <InputWithPlusMinus type="cart" cartProduct={cartItem} user={user} />
            </div>
            <div className="hidden basis-1/12 justify-center items-center md:flex">
                <span className="">₩ {cartItem.totalPricePerProduct!.toLocaleString()}</span>
            </div>
            <div className="basis-2/12 flex justify-center items-center md:basis-1/12">
                <BsTrash className={`${ICON_CLASS}`} onClick={handleDelete} />
            </div>
        </li>
    );
}
