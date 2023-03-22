import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { useAuthContext } from '../../context/AuthContext';
import { InflowRouteType, User } from '../../types/user';
import TextBox from '../../components/ui/TextBox';
import { AUTH_GRID_CLASS } from './Login';

const INPUT_CLASSNAME = 'border rounded-md p-2 border-gray-300 outline-none mb-2 mt-1';

const ageOptions = ['10대 ~ 20대', '20대 ~ 30대', '30대 ~ 40대', '40대 ~ 50대', '50대 ~ 60대', '60대 이상 ', '기타'];
const inflowRouteOptions: InflowRouteOption[] = [
    { label: 'Instagram', value: 'instagram' },
    { label: 'Facebook', value: 'facebook' },
    { label: '직접 검색', value: 'directSearch' },
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
    const { register } = useAuthContext();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        await register(userInfo);
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

    const handleAge = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setUserInfo((prev) => ({ ...prev, age: (e.target as HTMLSelectElement).value }));
    };

    const handleInflowRoute = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = e.target.value as InflowRouteType;
        setUserInfo((prev) => ({ ...prev, inflowRoute: selected }));
    };

    return (
        <section className="flex justify-center gap-8 mt-10 font-Abel h-auto md:h-160">
            <article className={`${AUTH_GRID_CLASS} my-auto`}>
                <form action="" className="mb-4 flex flex-col">
                    <p className="mb-5 font-semibold text-lg">Register</p>
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
                    <div className="flex mt-1 mb-2">
                        <TextBox text="남성" setState={setUserInfo} setField="gender" customStyle="w-10 rounded-lg" />
                        <TextBox text="여성" setState={setUserInfo} setField="gender" customStyle="w-10 rounded-lg" />
                    </div>
                    <p>Age</p>
                    <select
                        name=""
                        id="AgeOptions"
                        onChange={handleAge}
                        value={userInfo.age}
                        className="w-full border border-dashed border-brand outline-none mb-5 mt-1"
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
                        id="inflowOptions"
                        onChange={handleInflowRoute}
                        value={userInfo.inflowRoute}
                        className="w-full border border-dashed border-brand outline-none mb-5 mt-1"
                    >
                        {inflowRouteOptions.map((option: InflowRouteOption, id) => (
                            <option className="text-center" key={uuid()} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <button
                        className="block text-center bg-brand text-white mt-2 rounded-md py-1"
                        onClick={handleSubmit}
                    >
                        Register
                    </button>
                </form>
                <p className="mt-5">
                    Already have an account?
                    <Link to={'/auth/login'} className="underline ml-1">
                        Login
                    </Link>
                </p>
            </article>
            <div className="hidden basis-1/3 h-full md:block">
                <img className="h-full" src={process.env.PUBLIC_URL + '/images/auth/register.jpg'} alt="register_img" />
            </div>
        </section>
    );
}
