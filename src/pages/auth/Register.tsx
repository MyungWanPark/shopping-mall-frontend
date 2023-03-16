import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { useAuthContext } from '../../context/AuthContext';
import { InflowRouteType, User } from '../../types/user';

const INPUT_CLASSNAME = 'border rounded-md p-2 border-gray-300';

const ageOptions = ['10대 ~ 20대', '20대 ~ 30대', '30대 ~ 40대', '40대 ~ 50대', '50대 ~ 60대', '60대 ~ '];
const inflowRouteOptions: InflowRouteOption[] = [
    { label: 'Instagram', value: 'instagram' },
    { label: 'Facebook', value: 'facebook' },
    { label: '직접검색', value: 'directSearch' },
    { label: '기타', value: 'etc' },
];

type InflowRouteOption = { label: string; value: InflowRouteType };

export default function Register() {
    const [userInfo, setUserInfo] = useState<User>({
        email: '',
        password: '',
        name: '',
        gender: '',
        age: ageOptions[0],
        inflowRoute: inflowRouteOptions[0].value,
    });

    const navigate = useNavigate();
    const { register } = useAuthContext();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        await register(userInfo);
        navigate('/');
    };

    const handleEmail = (e: React.ChangeEvent) => {
        setUserInfo((prev) => ({ ...prev, email: (e.target as HTMLInputElement).value }));
    };

    const handlePassword = (e: React.ChangeEvent) => {
        setUserInfo((prev) => ({ ...prev, password: (e.target as HTMLInputElement).value }));
    };

    const handleName = (e: React.ChangeEvent) => {
        setUserInfo((prev) => ({ ...prev, name: (e.target as HTMLInputElement).value }));
    };

    const handleGender = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        const sizeBtns = document.querySelectorAll('.genderBtn');
        sizeBtns.forEach((btn) => btn.classList.remove('bg-gray-700'));
        const target = e.target as HTMLSpanElement;
        target.classList.add('bg-gray-700');
        setUserInfo((prev) => ({ ...prev, gender: target.textContent! }));
    };

    const handleAge = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setUserInfo((prev) => ({ ...prev, age: (e.target as HTMLSelectElement).value }));
    };

    const handleInflowRoute = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = e.target.value as InflowRouteType;
        setUserInfo((prev) => ({ ...prev, inflowRoute: selected }));
    };

    return (
        <section className="flex justify-center gap-8">
            <article className="">
                <p className="mb-5">Welcome!</p>
                <form action="" className="mb-4 flex flex-col">
                    <p>Email</p>
                    <input
                        type="email"
                        placeholder="enter your email.."
                        value={userInfo?.email}
                        onChange={handleEmail}
                        className={INPUT_CLASSNAME}
                    />
                    <p>Password</p>
                    <input
                        type="password"
                        placeholder="enter your password.."
                        value={userInfo?.password}
                        onChange={handlePassword}
                        className={INPUT_CLASSNAME}
                    />
                    <p>Name</p>
                    <input
                        type="text"
                        placeholder="enter your name.."
                        value={userInfo?.name}
                        onChange={handleName}
                        className={INPUT_CLASSNAME}
                    />
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
                        value={userInfo.age}
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
                        value={userInfo.inflowRoute}
                        className="ml-2 w-96 border border-dashed border-brand outline-none mb-5"
                    >
                        {inflowRouteOptions.map((option: InflowRouteOption, id) => (
                            <option className="text-center" key={uuid()} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <button className="block text-center bg-brand text-white mt-2 rounded-md" onClick={handleSubmit}>
                        Register
                    </button>
                </form>
                <p className="mt-5">
                    Already have an account?
                    <Link to={'/auth/login'} className="underline">
                        Login
                    </Link>
                </p>
            </article>
            <div className="w-96">
                <img src={process.env.PUBLIC_URL + '/images/auth/register.jpg'} alt="register_img" />
            </div>
        </section>
    );
}
