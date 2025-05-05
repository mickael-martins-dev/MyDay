

import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { IUser } from "../models/Model";
import BaseLayout from "../pages/layout/BaseLayout";

const ProtectedRoute: React.FC = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState<IUser>({ _id: "0", username: "ooo" });
    const [loading, setLoading] = useState<boolean>(true);

    const logout = async () => {
        const API_URL = "http://localhost:4000"
        const response = await fetch(`${API_URL}/logout`, {
            method: 'POST',
            credentials: 'include',
        });

        console.log(JSON.stringify(response))
        if (response.ok) {
            navigate('/Login');
        }
    }

    useEffect(() => {
        setLoading(true)
        const API_URL = "http://localhost:4000"
        fetch(`${API_URL}/api/check-auth`, {
            credentials: 'include',
        })
            .then(res => {
                if (res.ok) return res.json();
                else throw new Error(res.statusText)
            }
            ).then(user => {
                setUser(user.user as IUser);
                setLoading(false);
            })
            .catch(() => navigate('/login', { replace: true }));
    }, []);


    return (
        <BaseLayout logout={logout} >
            <Outlet context={{ loading, user, logout }} />
        </BaseLayout>

    );
};

export default ProtectedRoute;