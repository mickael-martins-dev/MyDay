import React, { useState } from 'react';
import './styles/Home.css';
import './styles/Mobile.css';
import { Link } from 'react-router-dom';

function Identifiants() {
    const[pseudo, setPseudo]=useState("")

    const handleSubmit = async () => {

    }
    // const [pseudo, setPseudo] = useState('');
    // const [password, setPassword] = useState('');

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    
    //     // Ici, tu peux envoyer les données au backend ou gérer la logique de création du compte
    //     const userData = {
    //       pseudo,
    //       password,
    //     };
        
    //     console.log('User Data:', userData);
    //     // Effectuer l'envoi de ces données à l'API ou base de données

    //     try {
    //         // const API_URL=process.env.REACT_APP_API_URL || "http://localhost:4000";

    //         // const API_URL="https://myday-back.onrender.com";
    //         // const API_URL = "http://localhost:4000";
    //         const API_URL =
    //             window.location.hostname === "localhost"
    //                 ? "http://localhost:4000"
    //                 : "https://myday-back.onrender.com";
                    
            

    //         const response = await fetch(`${API_URL}/Login`, {
    //         // const response = await fetch("http://localhost:4000/Login", {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify(userData),
    //             credentials: 'include'
    //         });
    
    //         const data = await response.json();
    //         console.log("Réponse du serveur :", data);
    
    //         if (data.success) {
    //             window.location.href = data.redirectUrl;
    //         }
    //     } catch (error) {
    //         console.error("Erreur lors de l'envoi :", error);
    //     }
    //   };

    return (
        <div className="container">
            <div className="header">
            <h1>
                <span>m</span><span>y</span><span>D</span><span>a</span><span>y</span>
                </h1>
            </div >
            
            <h5>Identifiants</h5>
            <form onSubmit={handleSubmit}>
                <div className="position-boutons-identifiants"> 
                    <Link to="/IdentifiantsPseudo">
                        <button type="button" className="submit-button-identifiants1">
                            Pseudo oublié
                        </button>
                    </Link>


                    <Link to="/IdentifiantsMdp">
                        <button type="button" className="submit-button-identifiants">
                            Mot de pass oublié
                        </button>
                    </Link>
                </div>
                

                
                {/* <h4>
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
                </h4> */}
                {/* <div className="boutton-clear-submit-index">
                        <button type="button" className="submit-button">
                            Réinitialiser le mot de passe !
                        </button>
                </div> */}
                <hr className="hr" />
                {/* <div className="boutton-clear-submit-index">
                    <Link to="/Register">
                        <button type="button" className="submit-button">
                            Créer un compte
                        </button>
                    </Link>
                </div> */}
                
            </form>
              {/* <div className='rouesDesEmotions'>
                <img src="/construction.png" alt="page en construction"></img>
              </div> */}

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
