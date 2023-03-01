/* import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { login, logout } from '../api/firebase';
import { onUserStateChanged } from '../api/firebase';
import { User } from 'firebase/auth';

type Props = {
    children: ReactNode;
};

const AuthContext = createContext({ user: {} as User & { isAdmin: boolean }, login, logout });

export function AuthContextProvider({ children }: Props) {
    const [user, setUser] = useState<User & { isAdmin: boolean }>();
    useEffect(() => {
        onUserStateChanged(setUser);
    }, []);

    return <AuthContext.Provider value={{ user: user!, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
    return useContext(AuthContext);
}
 */
export {};
