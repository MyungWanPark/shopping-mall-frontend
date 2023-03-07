import { createContext, useContext } from 'react';
import CartService from '../service/cart';

type Context = {
    cartService: CartService;
};

const CartContext = createContext<Context>({} as Context);

type Props = {
    cartService: CartService;
    children: React.ReactNode;
};

export function CartProvider({ cartService, children }: Props) {
    const context = {
        cartService,
    };

    return <CartContext.Provider value={context}>{children}</CartContext.Provider>;
}

export function useCartContext() {
    return useContext(CartContext);
}
