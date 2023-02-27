import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiShoppingBag } from 'react-icons/bi';
import { v4 as uuid } from 'uuid';

const INPUT_CLASSNAME = 'border rounded-md p-2 border-gray-300';

const ageOptions = ['10대 ~ 20대', '20대 ~ 30대', '30대 ~ 40대', '40대 ~ 50대', '50대 ~ 60대', '60대 ~ '];
const inflowRouteOptions = ['Instagram', 'Facebook', '네이버', '카카오', '구글', '기타'];

export default function Register() {
    const [selectedAge, setSelectedAge] = useState<string>(ageOptions[0]);
    const [selectedInflowRoute, setSelectedInflowRoute] = useState<string>(inflowRouteOptions[0]);

    const handleGender = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        const sizeBtns = document.querySelectorAll('.genderBtn');
        sizeBtns.forEach((btn) => btn.classList.remove('bg-gray-700'));
        (e.target as HTMLSpanElement).classList.add('bg-gray-700');
    };

    const handleAge = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedAge(e.target.value);
    };

    const handleInflowRoute = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedInflowRoute(e.target.value);
    };

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
                        <input type="email" placeholder="enter your email.." className={INPUT_CLASSNAME} />
                        <p>Password</p>
                        <input type="password" placeholder="enter your password.." className={INPUT_CLASSNAME} />
                        <p>Name</p>
                        <input type="text" placeholder="enter your name.." className={INPUT_CLASSNAME} />
                        <p>Gender</p>
                        <div>
                            <span
                                className="genderBtn inline-block w-10 h-8 border border-black cursor-pointer"
                                onClick={handleGender}
                            >
                                남성
                            </span>
                            <span
                                className="genderBtn inline-block w-10 h-8 border border-black cursor-pointer"
                                onClick={handleGender}
                            >
                                여성
                            </span>
                        </div>
                        <p>Age</p>
                        <select
                            name=""
                            id="options"
                            onChange={handleAge}
                            value={selectedAge}
                            className="ml-2 w-96 border border-dashed border-brand outline-none mb-5"
                        >
                            {ageOptions.map((option: string) => (
                                <option className="text-center" key={uuid()}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        <p>어떻게 오셨나요?</p>
                        <select
                            name=""
                            id="options"
                            onChange={handleInflowRoute}
                            value={selectedInflowRoute}
                            className="ml-2 w-96 border border-dashed border-brand outline-none mb-5"
                        >
                            {inflowRouteOptions.map((option: string) => (
                                <option className="text-center" key={uuid()}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        <button className="block text-center bg-brand text-white mt-2 rounded-md">Register</button>
                    </form>
                    <p className="mt-5">
                        Already have an account?
                        <Link to={'/login'} className="underline">
                            Login
                        </Link>
                    </p>
                </article>
            </div>
            <div className="w-96">
                <img src={process.env.PUBLIC_URL + '/images/auth/register.jpg'} alt="register_img" />
            </div>
        </section>
    );
}
