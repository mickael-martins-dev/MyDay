import React, { useState, useEffect } from 'react';
import './styles/Home.css';
import './styles/Mobile.css';
import { Link, useNavigate } from 'react-router-dom';

function DelUser() {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState(null); // Pour gérer les erreurs
  const [success, setSuccess] = useState(null); // Pour afficher un message de succès
  const navigate = useNavigate(); // Pour la redirection après suppression

  useEffect(() => {
    const fetchUserTheme = async () => {
      try {
        const API_URL =
          window.location.hostname === 'localhost'
            ? 'http://localhost:4000'
            : 'https://myday-back.onrender.com';

        const response = await fetch(`${API_URL}/user-feelings`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });

        const dataFeelings = await response.json();
        document.body.className = dataFeelings.theme;
      } catch (error) {
        console.error('Erreur lors de la récupération des émotions :', error);
      }
    };

    fetchUserTheme();
  }, []);

  const handleDelete = async () => {
    try {
      const API_URL =
        window.location.hostname === 'localhost'
          ? 'http://localhost:4000'
          : 'https://myday-back.onrender.com';

      const response = await fetch(`${API_URL}/DelUser`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (response.ok) {
        setSuccess('Compte supprimé avec succès !');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError('Erreur lors de la suppression du compte.');
      }
    } catch (error) {
      setError('Erreur lors de la suppression du compte.');
      console.error('Erreur:', error);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>
          <span>m</span>
          <span>y</span>
          <span>D</span>
          <span>a</span>
          <span>y</span>
        </h1>
      </div>

      <h5>Suppression de compte</h5>

      <form>
        <div className="h4-bis">
          <input
            type="checkbox"
            id="terms"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
          />
          <label htmlFor="terms" >
            En cliquant sur supprimer toutes mes données sont définitivement perdues
          </label>
        </div>
        <button
          className="submit-button-supprimer"
          type="button"
          onClick={handleDelete}
          disabled={!acceptedTerms}
        >
          Supprimer
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="error-message">{success}</p>}

      <hr className="hr" />
      <Link to="/Settings">
        <button type="button" className="submit-button">
          Settings
        </button>
      </Link>

      <p className="droits">
        © 2025 myDay. Tous droits réservés. Cette application, ainsi que l’ensemble de son
        contenu, est protégée par les lois en vigueur relatives à la propriété intellectuelle. Les
        données qu’elle contient sont chiffrées afin d’en garantir la sécurité.
      </p>
    </div>
  );
}

export default DelUser;
