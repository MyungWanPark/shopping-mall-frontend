import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

type Props = {
    children: JSX.Element;
    requiredAdmin: boolean;
};

export default function ProtectedRoute({ children, requiredAdmin }: Props) {
    const { user } = useAuthContext();

    /*     if (!user || (requiredAdmin && !user.isAdmin)) {
        return <Navigate to={'/'} replace={true} />;
    } */

    return children;
}
