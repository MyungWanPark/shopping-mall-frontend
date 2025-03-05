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

    async getProductsByCategory(category: Category, page: number): Promise<ProductType[] | any> {
        return this.http.fetch(`/products?category=${category}&page=${page}`, {
            method: 'GET',
        });
    }

    async getProductsByKeyword(keyword: string, page: number): Promise<ProductType[] | any> {
        return this.http.fetch(`/products?keyword=${keyword}&page=${page}`, {
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
