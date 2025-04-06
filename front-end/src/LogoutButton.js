import React from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:4000/logout', {
                method: 'POST',
                credentials: 'include',  // Pour inclure les cookies de session dans la requête
            });

            const data = await response.json();
            console.log(data.message);  // Vous pouvez afficher un message ou gérer la réponse

            // Redirection après déconnexion
            navigate('/login');  // Utilisation de react-router pour la redirection
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
