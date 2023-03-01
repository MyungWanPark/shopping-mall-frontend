import { createContext, useContext, useEffect, useState } from 'react';
import AuthService from '../service/auth';
import { User } from '../types/user';

type Context = {
    user: any;
    register: ({ email, password, name, gender, age, inflowRoute }: User) => Promise<void>;
    login: ({ email, password }: User) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<Context>({} as Context);

type Props = {
    authService: AuthService;
    children: React.ReactNode;
};

export function AuthProvider({ authService, children }: Props) {
    const [user, setUser] = useState(undefined);

    useEffect(() => {
        authService.me().then(setUser).catch(console.error);
    }, [authService]);

    const register = async ({ email, password, name, gender, age, inflowRoute }: User) =>
        authService.register({ email, password, name, gender, age, inflowRoute }).then((user) => setUser(user));

    const login = async ({ email, password }: User) =>
        authService.login({ email, password }).then((user) => setUser(user));

    const logout = async () => authService.logout().then(() => setUser(undefined));

    const context = {
        user,
        register,
        login,
        logout,
    };

    return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
    return useContext(AuthContext);
}
