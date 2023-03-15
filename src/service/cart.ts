import HttpClient from '../network/http';
import { CartItemType } from '../types/cart';

export default class CartService {
    http: HttpClient;

    constructor(http: HttpClient) {
        this.http = http;
    }

    async getCartItems() {
        const allCartItems: CartItemType[] = await this.http.fetch('/cart', {
            method: 'GET',
        });
        return allCartItems.filter((cartItem) => !cartItem.isOrdered);
    }

    async getOrderedCartItems() {
        const allCartItems: CartItemType[] = await this.http.fetch('/cart', {
            method: 'GET',
        });
        return allCartItems.filter((cartItem) => cartItem.isOrdered);
    }

    async addToCart(cartItem: CartItemType) {
        return this.http.fetch('/cart/add', {
            method: 'POST',
            body: JSON.stringify(cartItem),
        });
    }

    async updateCartItem(cartItem: CartItemType) {
        return this.http.fetch('/cart/update', {
            method: 'PUT',
            body: JSON.stringify(cartItem),
        });
    }

    async deleteCartItem({ productId }: CartItemType) {
        return this.http.fetch('/cart/delete', {
            method: 'DELETE',
            body: JSON.stringify({ productId }),
        });
    }
}
