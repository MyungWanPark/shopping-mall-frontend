import HttpClient from '../network/http';
import { User } from '../types/user';

export default class AuthService {
    http: HttpClient;

    constructor(http: HttpClient) {
        this.http = http;
    }

    /*     async csrfToken() {
        const response = await this.http.fetch('/auth/-csrftoken', {
            method: 'GET',
        });
        return response.csrfToken;
    } */

    async register({ email, password, name, gender, age, inflowRoute }: User) {
        return this.http.fetch('/auth/register', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password,
                name,
                gender,
                age,
                inflowRoute,
            }),
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

    async getUsersByDate(startDate: Date, endDate: Date): Promise<User[] | any> {
        return await this.http.fetch(`/user?startDate=${startDate}&endDate=${endDate}`, {
            method: 'GET',
        });
    }

    async getAllUsers(): Promise<User[] | any> {
        return await this.http.fetch(`/user/all`, {
            method: 'GET',
        });
    }
}
