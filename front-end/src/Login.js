import React, { useState, useEffect} from 'react';
import './styles/Home.css';
import './styles/Mobile.css';
import { Link } from 'react-router-dom';
// import { useEffect } from 'react';

function Login() {
    const [pseudo, setPseudo] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword,setShowPassword]=useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Ici, tu peux envoyer les données au backend ou gérer la logique de création du compte
        const userData = {
          pseudo,
          password,
        };
        
        console.log('User Data:', userData);
        document.body.className = "colorful";
        console.log("theme sur Login : ",document.body.className)
        // Effectuer l'envoi de ces données à l'API ou base de données

        try {
            // const API_URL=process.env.REACT_APP_API_URL || "http://localhost:4000";

            // const API_URL="https://myday-back.onrender.com";
            // const API_URL = "http://localhost:4000";
            const API_URL =
                window.location.hostname === "localhost"
                    ? "http://localhost:4000"
                    : "https://myday-back.onrender.com";
                    
            

            const response = await fetch(`${API_URL}/Login`, {
            // const response = await fetch("http://localhost:4000/Login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
                credentials: 'include'
            });
    
            const data = await response.json();
            console.log("Réponse du serveur :", data);
    
            // if (data.success) {
            //     window.location.href = data.redirectUrl;
            //     document.body.classList.add(data.theme);
            // }
            // else {
            // // Si le serveur renvoie un message d'erreur, l'afficher ici
            //     setErrorMessage(data.errorMessage);
            // }
            if (data.success) {
                // Appeler l'API pour récupérer le thème après la connexion réussie
                const themeResponse = await fetch(`${API_URL}/getTheme`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ pseudo: data.username }),  // Utilise le pseudo retourné par le serveur
                    credentials: 'include'
                });

                const themeData = await themeResponse.json();
                if (themeData.success && themeData.theme) {
                    // Appliquer le thème et le stocker dans localStorage
                    document.body.classList.add(themeData.theme);
                    localStorage.setItem('theme', themeData.theme);  // Sauvegarde du thème dans localStorage
                }

                // Rediriger après avoir appliqué le thème
                window.location.href = data.redirectUrl;
            } else {
                setErrorMessage(data.errorMessage);
            }
        } catch (error) {
            console.error("Erreur lors de l'envoi :", error);
        }
      };

      useEffect(() => {
        document.body.className = "colorful"; 
        console.log("Thème appliqué à l'arrivée sur la page :", document.body.className);
    }, []);

    return (
        <div className="container">
            <div className="header">
            <h1>
                <span>m</span><span>y</span><span>D</span><span>a</span><span>y</span>
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
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder=""
                    />
                    <butt
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="button-option"
                >
                    {showPassword ? "😎" : "👀"}
                </butt>
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

                <hr className="hr" />
                <div className="boutton-clear-submit-index-idOublie">
                    <Link to="/Identifiants">
                        <button type="button" className="submit-button-id">
                            Identifiants oubliés
                        </button>
                    </Link>
                </div>
                
            </form>
            {errorMessage && (<p className="error-message">{errorMessage}</p>)}
            <p className ="droits">© 2025 myDay. Tous droits réservés.
            Cette application, ainsi que l’ensemble de son contenu, est protégée par les lois en vigueur relatives à la propriété intellectuelle. Les données qu’elle contient sont chiffrées afin d’en garantir la sécurité. </p>
        </div>
    );
}

export default Login;
