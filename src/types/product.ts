export type UpdatedProductType = {
    title: string;
    price: number;
    category: string;
    description: string;
    options: string[];
    id: string;
    imgURL: string;
};

export type ProductType = {
    id?: number;
    name?: string;
    category?: string;
    imgURL?: string;
    price?: number;
    description?: string;
    colors?: string[];
};

export type Category = 'all' | 'men' | 'women' | 'bag' | 'shoes';

export type CartProductType = {
    title: string;
    price: number;
    category: string;
    description: string;
    option: string;
    id: string;
    imgURL: string;
    quantity: number;
};
