import React, { useState } from 'react';
import './styles/Home.css';
import './styles/Mobile.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Identifiants() {
    const [pseudo, setPseudo] = useState("");
    const [phraseRegister, setPhraseRegister] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState(""); // Nouvel état pour le message de succès
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            pseudo,
            phraseRegister,
            newPassword
        };
        try {
            const API_URL = window.location.hostname === 'localhost'
                ? "http://localhost:4000"
                : "https://myday-back.onrender.com";

            const response = await fetch(`${API_URL}/IdentifiantsMdp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
                credentials: 'include'
            });

            const data = await response.json(); // Attendre la réponse avant de la manipuler

            if (data.message) {
                setErrorMessage(data.message); // Afficher l'erreur
            } else {
                setErrorMessage(""); // 
                // setPseudo("");
                setPhraseRegister("");
                setNewPassword("");
                // Ici, tu peux gérer le succès
                setSuccessMessage("Mot de passe réinitialisé avec succès !");
                // Réaliser la redirection vers la page de connexion après un délai
                setTimeout(() => {
                    navigate('/Login');
                }, 2000); // Redirige après 2 secondes
            }
        } catch (error) {
            console.error("Erreur lors de l'envoi :", error);
            setErrorMessage("Erreur lors de la demande, veuillez réessayer.");
        }
    };

    return (
        <div className="container">
            <div className="header">
                <h1>
                    <span>M</span><span>y</span><span>D</span><span>a</span><span>y</span>
                </h1>
            </div>

            <h5>Identifiants</h5>
            <p>In progress ⚙️</p>
            <form onSubmit={handleSubmit}>
                <h4>
                    <label htmlFor="pseudo">Pseudo: </label>
                    <input
                        className="login-input"
                        type="text"
                        id="pseudo"
                        name="pseudo"
                        value={pseudo}
                        onChange={(e) => setPseudo(e.target.value)}
                        required
                    />
                </h4>
                <h4>
                    <select
                        id="phraseRegister"
                        className="phrase-select"
                        value={phraseRegister}
                        onChange={(e) => setPhraseRegister(e.target.value)}
                    >
                        <option>Choisir une phrase.</option>
                        <option value="pizza">Je suis l'élement principal de la pizza.</option>
                        <option value="ia">Mon cerveau est la meilleure de IA.</option>
                        <option value="courant">Je préfère marcher à contre-courant.</option>
                        <option value="toi">Toi sans moi, ça ne sera jamais nous.</option>
                    </select>
                </h4>
                <h4>
                    <label htmlFor="newPassword">Nouveau mot de passe: </label>
                    <input
                        className="login-input"
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </h4>
                <div className="boutton-clear-submit-index">
                    <button type="submit" className="submit-button">
                        Réinitialiser le mot de passe 
                    </button>
                </div>
                <hr className="hr" />
            </form>

            {/* Affichage du message de succès en pop-up */}
            {successMessage && (
                <div className="popup-success">
                    <p>{successMessage}</p>
                </div>
            )}

            <Link to="/Login">
                <button type="button" className="submit-button">
                    Connexion
                </button>
            </Link>

            <p className ="droits">© 2025 myDay. Tous droits réservés.
            Cette application, ainsi que l’ensemble de son contenu, est protégée par les lois en vigueur relatives à la propriété intellectuelle. Les données qu’elle contient sont chiffrées afin d’en garantir la sécurité. </p>  
        </div>
    );
}

export default Identifiants;
