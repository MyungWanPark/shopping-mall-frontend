import { createContext, useContext } from 'react';
import ProductService from './../service/product';

type Context = {
    productService: ProductService;
};

const ProductContext = createContext<Context>({} as Context);

type Props = {
    productService: ProductService;
    children: React.ReactNode;
};

export function ProductProvider({ productService, children }: Props) {
    const context = {
        productService,
    };

    return <ProductContext.Provider value={context}>{children}</ProductContext.Provider>;
}

export function useProductContext() {
    return useContext(ProductContext);
}
