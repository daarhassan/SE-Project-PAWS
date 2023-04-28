import { useEffect } from 'react';

export default function Logout() {
    useEffect(() => {
        localStorage.removeItem('jwtToken');
        window.location = "/";
    }, []);

    return "";
};