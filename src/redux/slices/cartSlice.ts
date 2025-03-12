import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItemType } from '../../types/cart';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface CartState {
    items: CartItemType[];
    isSynced: boolean;
}

const initialState: CartState = {
    items: JSON.parse(localStorage.getItem('cart') || '[]'),
    isSynced: false,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state: CartState, action: PayloadAction<CartItemType>) => {
            const index = state.items.findIndex((item) => item.productId === action.payload.productId);
            if (index !== -1) {
                state.items[index] = {
                    ...state.items[index],
                    quantity: state.items[index].quantity! + action.payload.quantity!,
                };
            } else {
                state.items.push(action.payload);
            }
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        updateItem: (state, action: PayloadAction<CartItemType>) => {
            const index = state.items.findIndex((item) => item.productId === action.payload.productId);
            if (index !== -1) {
                state.items[index] = {
                    ...state.items[index],
                    ...action.payload,
                    totalPricePerProduct: state.items[index].productPrice! * action.payload.quantity!,
                };
                localStorage.setItem('cart', JSON.stringify(state.items));
            }
        },
        deleteItem: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter((item) => item.productId !== action.payload);
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        changeQuantity: (state, action: PayloadAction<{ productId: number; quantity: number }>) => {
            const index = state.items.findIndex((item) => item.productId === action.payload.productId);
            if (index !== -1) {
                state.items[index].quantity = action.payload.quantity;
                state.items[index].totalPricePerProduct = state.items[index].productPrice! * action.payload.quantity;
                localStorage.setItem('cart', JSON.stringify(state.items));
            }
        },
        clearCart: (state) => {
            state.items = [];
            localStorage.removeItem('cart');
        },
        syncCartWithServer: (state, action: PayloadAction<CartItemType[]>) => {
            state.items = action.payload;
        },
    },
});

export const { addItem, updateItem, deleteItem, clearCart, syncCartWithServer } = cartSlice.actions;
export default cartSlice.reducer;
