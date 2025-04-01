import React, { useState } from 'react';
import './styles/Home.css';
import './styles/Mobile.css';

function Home() {
    const [rating1, setRating1] = useState(0);
    const [rating2, setRating2] = useState(0);
    const [rating3, setRating3] = useState(0);
    const [rating4, setRating4] = useState(0);
    const [phrase, setPhrase] = useState('');

    const handleRatingChangeF1 = (newRating) => {
        setRating1(newRating);
    };

    const handleRatingChangeF2 = (newRating) => {
        setRating2(newRating);
    };

    const handleRatingChangeF3 = (newRating) => {
        setRating3(newRating);
    };

    const handleRatingChangeF4 = (newRating) => {
        setRating4(newRating);
    };

    const handlePhraseChange = (event) => {
        setPhrase(event.target.value);
    };

    return (
        <div className="container">
            <div className="header">
                <h1>myDay</h1>
            </div>

            {[ 
                { title: "Joie", rating: rating1, setRating: handleRatingChangeF1 }, 
                { title: "Stress", rating: rating2, setRating: handleRatingChangeF2 }, 
                { title: "Colère", rating: rating3, setRating: handleRatingChangeF3 }, 
                { title: "Légereté", rating: rating4, setRating: handleRatingChangeF4 }
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

            <hr class="hr" />
            <h3>Ma gratitude du jour</h3>
            <textarea
                className="phrase-input"
                placeholder="Ajoutez une phrase ou une réflexion..."
                value={phrase}
                onChange={handlePhraseChange}
            ></textarea>
            <div className="regles">
                <label for="horns">Régles : </label>
                <input className="checkBox-regles" type="checkbox" id="horns" name="horns" />
            </div>
            
            <button className="submit-button">Soumettre</button>
        </div>
    );
}

export default Home;
