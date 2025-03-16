import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export function RedirectHandler() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const redirectPath = params.get('redirect');
        if (redirectPath) {
            navigate(`/${redirectPath}`);
        }
    }, [location, navigate]);

    return null;
}
