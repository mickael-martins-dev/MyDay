import React, { useState } from 'react';
import './styles/Home.css';
import './styles/Mobile.css';

function Register() {
    const [pseudo, setPseudo] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [feelings, setFeelings] = useState(["", "", "", ""]); // 4 émotions par défaut
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     if (!acceptedTerms) {
    //         alert("Vous devez accepter les conditions générales pour continuer.");
    //         return;
    //     }

    //     if (password !== confirmPassword) {
    //         setErrorMessage("Les mots de passe ne correspondent pas.");
    //         return;
    //     }

    //     setErrorMessage(""); // Réinitialise le message d'erreur

    //     const userData = {
    //         pseudo,
    //         password,
    //         feelings,
    //     };

    //     console.log('User Data:', userData);
    //     // Envoi des données à l'API ou base de données

    //     try {
    //         const response = await fetch("http://localhost:4000/Register", {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify(userData),
    //         });
    
    //         const data = await response.json();
    //         console.log("Réponse du serveur :", data);
    //     } catch (error) {
    //         console.error("Erreur lors de l'envoi :", error);
    //     }

    //     fetch('/Register', {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         // body: JSON.stringify({ pseudo: document.getElementById("pseudo").value })
    //         body: JSON.stringify(userData)
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log("Réponse serveur :", data);
    //         if (data.pseudo) {
    //             window.location.href = "/Login"; // ✅ La redirection se fait ici
    //         }
    //     })
    //     .catch(error => console.error("Erreur :", error));
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!acceptedTerms) {
            alert("Vous devez accepter les conditions générales pour continuer.");
            return;
        }
    
        if (password !== confirmPassword) {
            setErrorMessage("Les mots de passe ne correspondent pas.");
            return;
        }
    
        setErrorMessage(""); // Réinitialise le message d'erreur
    
        const userData = {
            pseudo,
            password,
            feelings,
        };
    
        console.log('User Data:', userData);
    
        try {
            const API_URL=process.env.REACT_APP_API_URL || "http://localhost:4000";

            // const response = await fetch(`${API_URL}/
            const response = await fetch("http://localhost:4000/Register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });
    
            const data = await response.json();
            console.log("Réponse du serveur :", data);
    
            if (data) {
                window.location.href = "/Login"; // ✅ La redirection se fait ici
            }
        } catch (error) {
            console.error("Erreur lors de l'envoi :", error);
        }
    };
    

    const handleFeelingChange = (index, value) => {
        const updatedFeelings = [...feelings];
        updatedFeelings[index] = value;
        setFeelings(updatedFeelings);
    };

    return (
        <div className="container">
            <div className="header">
                <h1>
                    <span>M</span><span>y</span><span>D</span><span>a</span><span>y</span>
                </h1>
            </div>
            <form onSubmit={handleSubmit}>
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
                    <label htmlFor="password">Mot de passe : </label>
                    <input
                        className="login-input"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </h4>
                <h4>
                    <label htmlFor="confirmPassword">Confirmez le mot de passe : </label>
                    <input
                        className="login-input"
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </h4>
                {errorMessage && <p className="error-message">{errorMessage}</p>}

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

                <hr className="hr" />

                <h4>
                    <input
                        type="checkbox"
                        id="terms"
                        checked={acceptedTerms}
                        onChange={(e) => setAcceptedTerms(e.target.checked)}
                    />
                    <label htmlFor="terms"> J'accepte les conditions générales</label>
                </h4>
                <button className="submit-button" type="submit" disabled={!acceptedTerms}>
                    Soumettre
                </button>
            </form>
        </div>
    );
}

export default Register;
