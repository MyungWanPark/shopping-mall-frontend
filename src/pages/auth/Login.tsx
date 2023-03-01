import React from 'react';
import { Link } from 'react-router-dom';
import { BiShoppingBag } from 'react-icons/bi';

export default function Login() {
    return (
        <section className="flex justify-center gap-8">
            <div className="flex flex-col">
                <Link to={'/'} className="flex basis-1/4 justify-center items-center text-3xl text-brand">
                    <BiShoppingBag />
                    <h1>Fashion Mall</h1>
                </Link>
                <article className="">
                    <p className="mb-5">Welcome!</p>
                    <form action="" className="mb-4 flex flex-col">
                        <p>Email</p>
                        <input
                            type="email"
                            placeholder="enter your email.."
                            className="border rounded-md p-2 border-gray-300"
                        />
                        <p>Password</p>
                        <input
                            type="password"
                            placeholder="enter your password.."
                            className="border rounded-md p-2 border-gray-300"
                        />
                        <button className="block text-center bg-brand text-white mt-2 rounded-md">Login</button>
                    </form>
                    <button className="bg-yellow-300 block w-full rounded-md">Kakao Login</button>
                    <p className="mt-5">
                        Don't have an account?{' '}
                        <Link to={'/auth/register'} className="underline">
                            Register
                        </Link>
                    </p>
                </article>
            </div>
            <div className="w-96">
                <img src={process.env.PUBLIC_URL + '/images/auth/login.jpg'} alt="login_img" />
            </div>
        </section>
    );
}
