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
    id?: string;
    name?: string;
    category?: string;
    imgURL?: string;
    price?: number;
    description?: string;
    colors?: string[];
};

export type Category = 'all' | 'men' | 'women' | 'accessaries' | 'shoes';

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
