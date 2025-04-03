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

    const handleClear = () => {
        setRating1(0);
        setRating2(0);
        setRating3(0);
        setRating4(0);
        setPhrase('');
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const userData = {
            feeling1: rating1,  // Utiliser les états pour les évaluations
            feeling2: rating2,
            feeling3: rating3,
            feeling4: rating4,
            phraseGratitude: phrase,  // Utiliser l'état `phrase`
            regle: document.getElementById("regle").checked // Récupérer l'état de la checkbox
        };

        if (!window.confirm("Êtes-vous sûr ?")) {
            return; // Annule la soumission
        }

        try {
            const API_URL=process.env.REACT_APP_API_URL || "http://localhost:4000";

            // const response = await fetch(`${API_URL}/`, {
            const response = await fetch("http://localhost:4000", {    
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });
    
            const data = await response.json();
            console.log("Réponse du serveur :", data);

            if (data) {
                handleClear(); //
            }
    
            // if (data) {
            //     window.location.href = "/Login"; // ✅ La redirection se fait ici
            // }
        } catch (error) {
            console.error("Erreur lors de l'envoi :", error);
        }
    };
    

    // return (
    //     <div className="container">
    //         <div className="header">
    //             <h1>
    //             <span>M</span><span>y</span><span>D</span><span>a</span><span>y</span>
    //             </h1>
    //         </div>

    //         {[ 
    //              { id: "feeling1", title: "Joie", rating: rating1, setRating: handleRatingChangeF1 }, 
    //              { id: "feeling2", title: "Stress", rating: rating2, setRating: handleRatingChangeF2 }, 
    //              { id: "feeling3", title: "Colère", rating: rating3, setRating: handleRatingChangeF3 }, 
    //              { id: "feeling4", title: "Légèreté", rating: rating4, setRating: handleRatingChangeF4 }
    //         ].map((feeling, index) => (
    //             <div key={index}>
    //                 <h2>{feeling.title}</h2>
    //                 <div className="stars">
    //                     {[1, 2, 3, 4, 5].map((star) => (
    //                         <span
    //                             key={star}
    //                             className={`star ${feeling.rating >= star ? 'active' : ''}`}
    //                             onClick={() => feeling.setRating(star)}
    //                         >
    //                             &#9733;
    //                         </span>
    //                     ))}
    //                 </div>
    //             </div>
    //         ))}

    //         <hr class="hr" />
    //         <h3>Ma gratitude du jour</h3>
    //         <textarea
    //             className="phrase-input"
    //             placeholder="Ajoutez une phrase ou une réflexion..."
    //             value={phrase}
    //             id="phraseGratitude"
    //             onChange={handlePhraseChange}
    //         ></textarea>
    //         <div className="regles">
    //             <label for="regles">Régles : </label>
    //             <input className="checkBox-regles" type="checkbox" 
    //             id="regle" name="regle" />
    //         </div>
    //         <div className='boutton-clear-submit-index'>
    //             <button 
    //                 type="submit"
    //                 className="submit-button-clear"
    //                 onClick={handleClear}>
    //                 Effacer
    //             </button>
    //             <button 
    //                 type="submit"
    //                 className="submit-button">
    //                 Soumettre
    //             </button>  
    //         </div>

    //         <hr class="hr" />

    //         <button 
    //             type="submit"
    //             className="submit-button">
    //             Historique
    //         </button>
    //     </div>
    // );
    return (
        <div className="container">
            <div className="header">
                <h1>
                    <span>M</span><span>y</span><span>D</span><span>a</span><span>y</span>
                </h1>
            </div>
    
            <form onSubmit={handleSubmit}>
                {[
                    { id: "feeling1", title: "Joie", rating: rating1, setRating: handleRatingChangeF1 },
                    { id: "feeling2", title: "Stress", rating: rating2, setRating: handleRatingChangeF2 },
                    { id: "feeling3", title: "Colère", rating: rating3, setRating: handleRatingChangeF3 },
                    { id: "feeling4", title: "Légèreté", rating: rating4, setRating: handleRatingChangeF4 }
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
                        type="button"  // Empêche la soumission du formulaire
                        className="submit-button-clear"
                        onClick={handleClear}>
                        Effacer
                    </button>
                    <button 
                        type="submit"
                        className="submit-button">
                        Soumettre
                    </button>  
                </div>
            </form>
    
            <hr className="hr" />
    
            <button 
                type="button"  // Ne soumet pas le formulaire
                className="submit-button">
                Historique
            </button>
        </div>
    );
    

}

export default Home;
