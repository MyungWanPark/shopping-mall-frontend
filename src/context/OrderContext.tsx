import { createContext, useContext } from 'react';
import OrderService from '../service/order';

type Context = {
    orderService: OrderService;
};

const OrderContext = createContext<Context>({} as Context);

type Props = {
    orderService: OrderService;
    children: React.ReactNode;
};

export function OrderProvider({ orderService, children }: Props) {
    const context = {
        orderService,
    };

    return <OrderContext.Provider value={context}>{children}</OrderContext.Provider>;
}

export function useOrderContext() {
    return useContext(OrderContext);
}
