import { useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { User } from '../../types/user';

export const AUTH_GRID_CLASS = 'basis-full p-4 flex flex-col md:basis-1/3';

export default function Login() {
    const navigate = useNavigate();
    const { user, login, logout } = useAuthContext();
    const queryClient = useQueryClient();

    const [loginInfo, setLoginInfo] = useState<User>({
        email: '',
        password: '',
    });

    const handleEmail = (e: React.ChangeEvent) => {
        setLoginInfo((prev) => ({ ...prev, email: (e.target as HTMLInputElement).value }));
    };

    const handlePassword = (e: React.ChangeEvent) => {
        setLoginInfo((prev) => ({ ...prev, password: (e.target as HTMLInputElement).value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        queryClient.invalidateQueries(['cart', user?.id ? user.id : '']);
        await login(loginInfo);
        navigate('/');
    };

    return (
        <section className="flex justify-center gap-10 mt-10 font-Abel h-auto md:h-144">
            <article className={`${AUTH_GRID_CLASS} my-auto`}>
                <form action="" className="mb-4 flex flex-col">
                    <p className="mb-5 font-semibold text-lg">Login</p>
                    <p>Email</p>
                    <input
                        type="email"
                        placeholder="enter your email.."
                        className="border rounded-md p-2 border-gray-300 outline-none"
                        value={loginInfo.email}
                        onChange={handleEmail}
                    />
                    <p>Password</p>
                    <input
                        type="password"
                        placeholder="enter your password.."
                        className="border rounded-md p-2 border-gray-300 outline-none"
                        value={loginInfo.password}
                        onChange={handlePassword}
                    />
                    <button
                        className="block text-center bg-brand text-white mt-2 py-1 rounded-md"
                        onClick={handleSubmit}
                    >
                        Login
                    </button>
                </form>
                <button className="bg-yellow-300 block w-full py-1 rounded-md">Kakao Login</button>
                <p className="mt-5">
                    Don't have an account?{' '}
                    <Link to={'/auth/register'} className="underline">
                        Register
                    </Link>
                </p>
            </article>
            <div className="hidden h-full items-center basis-1/3 md:flex">
                <img className="h-full" src={process.env.PUBLIC_URL + '/images/auth/login.jpg'} alt="login_img" />
            </div>
        </section>
    );
}
