import { createContext, useContext } from 'react';
import { ProductType } from '../types/product';
import ProductService from './../service/product';
import { useMutation, useQueryClient, UseMutationResult } from '@tanstack/react-query';

type Context = {
    addNewProduct: UseMutationResult<
        any,
        unknown,
        {
            product: ProductType;
            imgURL: string;
        },
        unknown
    >;
};

const ProductContext = createContext<Context>({} as Context);

type Props = {
    productService: ProductService;
    children: React.ReactNode;
};

export function ProductProvider({ productService, children }: Props) {
    const queryClient = useQueryClient();
    const addNewProduct = useMutation(
        async ({ product, imgURL }: { product: ProductType; imgURL: string }) =>
            productService.addProduct({ ...product, imgURL }),
        {
            onSuccess: () => queryClient.invalidateQueries(['products']),
        }
    );

    const context = {
        addNewProduct,
    };
    // console.log(`context = ${JSON.stringify(context)}`);
    return <ProductContext.Provider value={context}>{children}</ProductContext.Provider>;
}

export function useProductContext() {
    return useContext(ProductContext);
}
