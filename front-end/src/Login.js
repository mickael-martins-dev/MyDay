import React, { useState } from 'react';
import './styles/Home.css';
import './styles/Mobile.css';
import { Link } from 'react-router-dom';

function Login() {
    const [pseudo, setPseudo] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Ici, tu peux envoyer les données au backend ou gérer la logique de création du compte
        const userData = {
          pseudo,
          password,
        };
        
        console.log('User Data:', userData);
        // Effectuer l'envoi de ces données à l'API ou base de données

        try {
            // const API_URL=process.env.REACT_APP_API_URL || "http://localhost:4000";

            const API_URL="https://myday-back.onrender.com";
            // const API_URL = "http://localhost:4000";
            // const API_URL =
            //     window.location.hostname === "localhost"
            //         ? "http://localhost:4000"
            //         : "https://myday-back.onrender.com";
                    
            

            const response = await fetch(`${API_URL}/Login`, {
            // const response = await fetch("http://localhost:4000/Login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
                credentials: 'include'
            });
    
            const data = await response.json();
            console.log("Réponse du serveur :", data);
    
            if (data.success) {
                window.location.href = data.redirectUrl;
            }
        } catch (error) {
            console.error("Erreur lors de l'envoi :", error);
        }
      };

    return (
        <div className="container">
            <div className="header">
            <h1>
                <span>M</span><span>y</span><span>D</span><span>a</span><span>y</span>
                </h1>
            </div>
            <h5>Connexion</h5>
            <form onSubmit={handleSubmit}>
                <h4>
                    <label htmlFor="pseudo" >Pseudo : </label>
                    <input className="login-input"
                    type="text"
                    id="pseudo"
                    name="pseudo"
                    value={pseudo}
                    onChange={(e) => setPseudo(e.target.value)}
                    required
                    placeholder=""
                    />
                </h4>
                <h4>
                    <label htmlFor="mot de pass" >Mot de pass : </label>
                    <input className="login-input"
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder=""
                    />
                </h4>
                <hr className="hr" />
                <div className="boutton-clear-submit-index">
                    <Link to="/Register">
                        <button type="button" className="submit-button">
                            Créer un compte
                        </button>
                    </Link>
                        <button 
                        type="submit"
                        className="submit-button">
                        Valider </button>
                </div>
                
            </form>
            
        </div>
    );
}

export default Login;
