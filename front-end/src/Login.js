import React, { useState } from 'react';
import './styles/Home.css';
import './styles/Mobile.css';

function Login() {
    const [pseudo, setPseudo] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Ici, tu peux envoyer les données au backend ou gérer la logique de création du compte
        const userData = {
          pseudo,
          password,
        };
        
        console.log('User Data:', userData);
        // Effectuer l'envoi de ces données à l'API ou base de données
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
                    value={pseudo}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder=""
                    />
                </h4>
                </form>
            <hr class="hr" />
            
            <button className="submit-button">Soumettre</button>
        </div>
    );
}

export default Login;
