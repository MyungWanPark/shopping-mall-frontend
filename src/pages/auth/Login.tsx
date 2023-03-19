import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { User } from '../../types/user';

export default function Login() {
    const navigate = useNavigate();
    const { login, logout } = useAuthContext();
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

        await login(loginInfo);
        navigate('/');
    };

    return (
        <section className="flex justify-center gap-10">
            <article className="basis-1/3 flex flex-col">
                <form action="" className="mb-4 flex flex-col">
                    <p className="mb-5">Welcome!</p>
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
            <div className="basis-1/3">
                <img className="h-5/6" src={process.env.PUBLIC_URL + '/images/auth/login.jpg'} alt="login_img" />
            </div>
        </section>
    );
}
