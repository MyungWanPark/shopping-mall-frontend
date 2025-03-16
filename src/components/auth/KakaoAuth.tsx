import { useEffect } from 'react';

export default function KakaoAuth() {
    useEffect(() => {
        window.close();
    }, []);

    return <div>로그인 중..</div>;
}
