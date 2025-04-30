

import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Cookies from 'universal-cookie';

// component
const ProtectedRoute = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const cookies = new Cookies(null, { path: '/' });
        const auth = cookies.get('my-day.cookie') !== undefined;
        if (!auth) {
            navigate('/login', { replace: true });
        }
    }, [navigate]);

    return (
        <Outlet />
    );
};

export default ProtectedRoute;