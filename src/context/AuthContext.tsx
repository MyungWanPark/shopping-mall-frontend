import { useQueryClient } from '@tanstack/react-query';
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../service/auth';
import { User } from '../types/user';
import useCart from '../hooks/useCart';

type Context = {
    user: any;
    register: ({ email, password, name, gender, age, inflowRoute }: User) => Promise<void>;
    login: ({ email, password }: User) => Promise<void>;
    logout: () => Promise<void>;
    kakaoLogin: () => void;
    authService: AuthService;
};

const AuthContext = createContext<Context>({} as Context);

type Props = {
    authService: AuthService;
    children: React.ReactNode;
};

export function AuthProvider({ authService, children }: Props) {
    const [user, setUser] = useState<User | undefined>(undefined);
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    useEffect(() => {
        authService
            .me()
            .then((res) => setUser(res.user))
            .catch((err) => {
                // console.error(`errors in useEffect doing me()`);
            });
    }, [authService]);

    const register = async ({ email, password, name, gender, age, inflowRoute }: User) => {
        authService
            .register({ email, password, name, gender, age, inflowRoute })
            .then((res) => {
                setUser(res.user);
                queryClient.invalidateQueries(['user']);
                queryClient.invalidateQueries(['cart']);
            })
            .then(() => navigate('/'))
            .catch((e) => alert('이미 존재하는 아이디 입니다.'));
    };

    const login = async ({ email, password }: User) =>
        authService.login({ email, password }).then((res) => {
            setUser(res.user);
            queryClient.invalidateQueries(['cart']);
        });

    const kakaoLogin = async () => {
        /* const response = await authService.kakaoLogin();
        const loginWindow = window.open(response.url, '_blank', 'width=500,height=600');

        const checkPopup = setInterval(() => {
            if (loginWindow?.closed) {
                clearInterval(checkPopup);
                window.location.href = '/';
            }
        }, 1000); */
        const response = await authService.kakaoLogin();
        window.location.href = response.url;
    };

    const logout = async () => authService.logout().then(() => setUser(undefined));

    const context = {
        user,
        register,
        login,
        logout,
        kakaoLogin,
        authService,
    };
    return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
    return useContext(AuthContext);
}
