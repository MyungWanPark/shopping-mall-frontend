import HttpClient from '../network/http';
import { Category, ProductType } from '../types/product';

export default class ProductService {
    http: HttpClient;

    constructor(http: HttpClient) {
        this.http = http;
    }

    async addProduct(product: ProductType) {
        return this.http.fetch('/products/new', {
            method: 'POST',
            body: JSON.stringify(product),
        });
    }

    async getProductsByCategory(category: Category): Promise<ProductType[] | any> {
        return this.http.fetch(`/products?category=${category}`, {
            method: 'GET',
        });
    }

    async getProductsByKeyword(keyword: string): Promise<ProductType[] | any> {
        return this.http.fetch(`/products?keyword=${keyword}`, {
            method: 'GET',
        });
    }

    async getProductByProductId(productId: number) {
        if (!productId) {
            return;
        }
        return this.http.fetch(`/products/${productId}`, {
            method: 'GET',
        });
    }
}
