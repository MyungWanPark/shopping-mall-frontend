import HttpClient from '../network/http';
import { OrderType } from '../types/order';

export default class OrderService {
    http: HttpClient;

    constructor(http: HttpClient) {
        this.http = http;
    }

    /*     async getAllOrders() {
        return this.http.fetch('/order/all', {
            method: 'GET',
        });
    } */

    async getOrdersByDate(startDate: Date, endDate: Date) {
        return this.http.fetch(`/order?startDate=${startDate}&endDate=${endDate}`, {
            method: 'GET',
        });
    }

    async createOrder(orderBody: OrderType) {
        return this.http.fetch('/order/new', {
            method: 'POST',
            body: JSON.stringify(orderBody),
        });
    }
}
