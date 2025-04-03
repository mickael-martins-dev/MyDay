import React, { useState } from 'react';
import './styles/Home.css';
import './styles/Mobile.css';

function Home() {
    const [rating1, setRating1] = useState(0);
    const [rating2, setRating2] = useState(0);
    const [rating3, setRating3] = useState(0);
    const [rating4, setRating4] = useState(0);
    const [phrase, setPhrase] = useState('');
    const [showPopup, setShowPopup] = useState(false); // État pour afficher le pop-up

    const handleRatingChange = (setter) => (newRating) => setter(newRating);
    const handlePhraseChange = (event) => setPhrase(event.target.value);

    const handleClear = () => {
        setRating1(0);
        setRating2(0);
        setRating3(0);
        setRating4(0);
        setPhrase('');
    };

    const handleSubmit = async () => {
        setShowPopup(false); // Fermer le pop-up après confirmation

        const userData = {
            feeling1: rating1,
            feeling2: rating2,
            feeling3: rating3,
            feeling4: rating4,
            phraseGratitude: phrase,
            regle: document.getElementById("regle").checked
        };

        try {
            const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";

            // const response = await fetch(`${API_URL}/`, {
            const response = await fetch("http://localhost:4000", {    
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });

            const data = await response.json();
            console.log("Réponse du serveur :", data);

            if (data) {
                handleClear();
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

            <form onSubmit={(e) => e.preventDefault()}>
                {[ 
                    { title: "Joie", rating: rating1, setRating: handleRatingChange(setRating1) },
                    { title: "Stress", rating: rating2, setRating: handleRatingChange(setRating2) },
                    { title: "Colère", rating: rating3, setRating: handleRatingChange(setRating3) },
                    { title: "Légèreté", rating: rating4, setRating: handleRatingChange(setRating4) }
                ].map((feeling, index) => (
                    <div key={index}>
                        <h2>{feeling.title}</h2>
                        <div className="stars">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    className={`star ${feeling.rating >= star ? 'active' : ''}`}
                                    onClick={() => feeling.setRating(star)}
                                >
                                    &#9733;
                                </span>
                            ))}
                        </div>
                    </div>
                ))}

                <hr className="hr" />
                <h3>Ma gratitude du jour</h3>
                <textarea
                    className="phrase-input"
                    placeholder="Ajoutez une phrase ou une réflexion..."
                    value={phrase}
                    id="phraseGratitude"
                    onChange={handlePhraseChange}
                ></textarea>

                <div className="regles">
                    <label htmlFor="regles">Régles : </label>
                    <input className="checkBox-regles" type="checkbox" id="regle" name="regle" />
                </div>

                <div className='boutton-clear-submit-index'>
                    <button 
                        type="button"
                        className="submit-button-clear"
                        onClick={handleClear}>
                        Effacer
                    </button>
                    <button 
                        type="button"
                        className="submit-button"
                        onClick={() => setShowPopup(true)}>
                        Soumettre
                    </button>  
                </div>
            </form>

            <hr className="hr" />

            <button type="button" className="submit-button">
                Historique
            </button>

            {/* Pop-up personnalisé */}
            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <p>Voulez-vous vraiment soumettre ?</p>
                        <button className="yes-btn" onClick={handleSubmit}>Oui</button>
                        <button className="no-btn" onClick={() => setShowPopup(false)}>Non</button>
                    </div>
                </div>
            )}

            {/* CSS interne pour le pop-up */}
            <style jsx>{`
                .popup {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .popup-content {
                    background: white;
                    padding: 20px;
                    border-radius: 10px;
                    text-align: center;
                    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
                }
                .yes-btn, .no-btn {
                    margin: 10px;
                    padding: 10px 20px;
                    cursor: pointer;
                    border: none;
                    border-radius: 5px;
                }
                .yes-btn {
                    background-color: green;
                    color: white;
                }
                .no-btn {
                    background-color: red;
                    color: white;
                }
            `}</style>
        </div>
    );
}

export default Home;
