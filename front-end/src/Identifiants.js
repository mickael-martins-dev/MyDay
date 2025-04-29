import React, { useState } from 'react';
import './styles/Home.css';
import './styles/Mobile.css';
import { Link } from 'react-router-dom';

function Identifiants() {
    const[pseudo, setPseudo]=useState("")
    const handleSubmit = async () => {
    }

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

                <hr className="hr" />
                
            </form>

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
