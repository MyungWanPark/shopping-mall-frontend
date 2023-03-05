import HttpClient from '../network/http';
import { ProductType } from '../types/product';
import { User } from '../types/user';

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

    async login({ email, password }: User) {
        return this.http.fetch('/auth/login', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password,
            }),
        });
    }

    async me() {
        return this.http.fetch('/auth/me', {
            method: 'GET',
        });
    }

    async logout() {
        return this.http.fetch('/auth/logout', {
            method: 'POST',
        });
    }
}
