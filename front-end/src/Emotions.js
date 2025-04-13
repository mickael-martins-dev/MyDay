import React, { useState } from 'react';
import './styles/Home.css';
import './styles/Mobile.css';
import { Link } from 'react-router-dom';

function Emotions() {
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
                <span>M</span><span>y</span><span>D</span><span>a</span><span>y</span>
                </h1>
            </div >
            
            <h5>Derrière la ...</h5>
            
            <div className='emotionsProfils'>
                <img src="/emotionsProfils.png" alt="emotions profils"></img>
            </div>

            <h5>Roues des emotions</h5>

            <div className='rouesDesEmotions'>
                <img src="/rouesDesEmotions.png" alt="Roues des émotions"></img>
            </div>
              

            <Link to="/Register">
              <button type="button" className="submit-button">
                  Création du compte
              </button>
             </Link>
             {/* ppppppppppppppppppppppppppppppp */}
             <p className ="droits">© 2025 myDay. Tous droits réservés.
             Cette application, ainsi que l’ensemble de son contenu, est protégée par les lois en vigueur relatives à la propriété intellectuelle. Les données qu’elle contient sont chiffrées afin d’en garantir la sécurité. </p>   
        </div>
    );
}

export default Emotions;
