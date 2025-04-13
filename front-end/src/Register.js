import React, { useState } from 'react';
import './styles/Home.css';
import './styles/Mobile.css';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

function Register() {
    const [pseudo, setPseudo] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [feelings, setFeelings] = useState(["", "", "", ""]); // 4 émotions par défaut
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);  // Ajouter l'état showPassword
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Ajouter l'état pour la confirmation du mot de passe


    useEffect(() => {
        const savedFeelings = localStorage.getItem('tempFeelings');
        if (savedFeelings) {
            setFeelings(JSON.parse(savedFeelings));
        }
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!acceptedTerms) {
            alert("Vous devez accepter les conditions générales pour continuer.");
            return;
        }
    
        if (password !== confirmPassword) {
            setErrorMessage("Les mots de passe ne sont pas identiques.");
            return;
        }
    
        setErrorMessage(""); // Réinitialise le message d'erreur
    
        const userData = {
            pseudo,
            mail,
            password,
            feelings,
        };
    
        console.log('User Data:', userData);
    
        try {
            // const API_URL=process.env.REACT_APP_API_URL || "http://localhost:4000";

            // const API_URL="https://myday-back.onrender.com";
            // const API_URL = "http://localhost:4000";

            const API_URL =
                window.location.hostname === "localhost"
                    ? "http://localhost:4000"
                    : "https://myday-back.onrender.com";


            const response = await fetch(`${API_URL}/Register`, {
            // const response = await fetch("http://localhost:4000/Register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
                credentials: 'include'
            });
    
            const data = await response.json();
            console.log("Réponse du serveur :", data);
    
            if (data) {
                localStorage.setItem('userFeelings', JSON.stringify(feelings));
                window.location.href = "/Login"; // ✅ La redirection se fait ici
                localStorage.removeItem('tempFeelings')
            }
        } catch (error) {
            console.error("Erreur lors de l'envoi :", error);
        }
    };
    

    const handleFeelingChange = (index, value) => {
        const updatedFeelings = [...feelings];
        updatedFeelings[index] = value;
        setFeelings(updatedFeelings);
        localStorage.setItem('tempFeelings', JSON.stringify(updatedFeelings));
    };

    return (
        <div className="container">
            <div className="header">
                <h1>
                    <span>M</span><span>y</span><span>D</span><span>a</span><span>y</span>
                </h1>
            </div>
            <form onSubmit={handleSubmit}>

                <h5>Tes émotions à suivre</h5>
                {feelings.map((feeling, index) => (
                    <h4 key={index}>
                        <label htmlFor={`feeling_${index + 1}`}>Émotion #{index + 1} : </label>
                        <input
                            className="login-input"
                            type="text"
                            id={`feeling_${index + 1}`}
                            value={feeling}
                            onChange={(e) => handleFeelingChange(index, e.target.value)}
                            required
                        />
                    </h4>
                ))}
                <Link to="/Emotions">
                        <button type="button" className="submit-button-roue">
                            Roue des émotions
                        </button>
                </Link>

                <h5>Données personnelles</h5>
                <h4>
                    <label htmlFor="pseudo">Pseudo : </label>
                    <input
                        className="login-input"
                        type="text"
                        id="pseudo"
                        value={pseudo}
                        onChange={(e) => setPseudo(e.target.value)}
                        required
                    />
                </h4>
                <h4>
                    <label htmlFor="mail">Email : </label>
                    <input
                        className="login-input"
                        type="mail"
                        id="mail"
                        value={mail}
                        onChange={(e) => setMail(e.target.value)}
                        required
                    />
                </h4>
                <h4>
                    <label htmlFor="password">Mot de passe : </label>
                    <input
                        className="login-input"
                        type={showPassword ? "text" : "password"} // Toggle entre password et text
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                     <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="button-option"
                >
                    {showPassword ? "😎" : "👀"}
                </button>
                </h4>
                <h4>
                    <label htmlFor="confirmPassword">Confirmez le mot de passe : </label>
                    <input
                        className="login-input"
                        type={showConfirmPassword ? "text" : "password"} // Toggle pour confirmer le mot de passe
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                  <button 
                    type="button" 
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="button-option"
                >
                    {showConfirmPassword ? "😎" : "👀"}
                </button>
                </h4>
                {errorMessage && <p className="error-message">{errorMessage}</p>}

                <hr className="hr" />

                <div className='h4-bis'>
                    <input
                        type="checkbox"
                        id="terms"
                        checked={acceptedTerms}
                        onChange={(e) => setAcceptedTerms(e.target.checked)}
                    />
                    <label htmlFor="terms"> J'accepte les conditions générales</label>
                </div>
                <div className="boutton-clear-submit-index">
                    <Link to="/Login">
                        <button type="button" className="submit-button">
                            J'ai déja un compte
                        </button>
                    </Link>
                    <button className="submit-button" type="submit" disabled={!acceptedTerms}>
                        Valider
                    </button>
                    
                </div>
                    
            </form>
            <p className ="droits">© 2025 myDay. Tous droits réservés.
            Cette application, ainsi que l’ensemble de son contenu, est protégée par les lois en vigueur relatives à la propriété intellectuelle. Les données qu’elle contient sont chiffrées afin d’en garantir la sécurité. </p>
        </div>
    );
}

export default Register;
