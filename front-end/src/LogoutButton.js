import React from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const API_URL =
                window.location.hostname === "localhost"
                    ? "http://localhost:4000"
                    : "https://myday-back.onrender.com";
                    
            const response = await fetch(`${API_URL}/logout`, {
                method: 'POST',
                credentials: 'include',
            });

            const data = await response.json();
            console.log(data.message); 

            // Redirection après déconnexion
            navigate('/Login');
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
        }
    };

    return (
        <button type="button" className="submit-button-deco" onClick={handleLogout}>
            <img src="/logout.png" alt="Logout" className="logout-icon" />
        </button>
    );
}

export default LogoutButton;
