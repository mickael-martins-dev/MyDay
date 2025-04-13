import React, { useEffect, useState } from 'react';
import './styles/Home.css';
import './styles/Mobile.css';
import { Link } from 'react-router-dom';

function Settings() {
    const [feelings, setFeelings] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [modifiedFeelings, setModifiedFeelings] = useState({});
    const [selectedOption, setSelectedOption] = useState(''); // Ajouté pour gérer le thème

    // Fonction pour gérer le changement dans la liste déroulante
    const handleSelectionChange = (e) => {
        setSelectedOption(e.target.value);

        // Appliquer la classe correspondante pour changer le thème
        document.body.className = e.target.value; // Applique la classe choisie sur le body
    };

    useEffect(() => {
        fetch('/getFeelings')
            .then(res => res.json())
            .then(data => setFeelings(data.feelings))
            .catch(err => console.error("Erreur en récupérant les émotions :", err));
    }, []);

    const handleInputChange = (index, value) => {
        setModifiedFeelings(prev => ({
            ...prev,
            [index]: value
        }));
    };

    const updateFeeling = (index) => {
        const newFeeling = modifiedFeelings[index];
        if (!newFeeling) return;

        fetch('/updateFeeling', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ index, newFeeling })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                const updatedFeelings = [...feelings];
                updatedFeelings[index] = newFeeling;
                setFeelings(updatedFeelings);
                setEditingIndex(null);
                setModifiedFeelings({});
            } else {
                console.error("Erreur côté serveur :", data.message);
            }
        })
        .catch(err => console.error("Erreur en mettant à jour :", err));
    };

    return (
        <div className="container">
            <div className="header">
                <h1>
                    <span>M</span><span>y</span><span>D</span><span>a</span><span>y</span>
                </h1>
            </div>
            
            <h5>Theme : </h5>
            <select id="theme-select" class="theme-select">
            <option value="colorful">Coloré</option>
            <option value="dark">not dev</option>

            </select>

            <h5>Emotions :</h5>
            <ol>
                {feelings.map((f, index) => (
                    <ol key={index}>
                        {editingIndex === index ? (
                            <>
                                <input
                                    type="text"
                                    defaultValue={f}
                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                    
                                />
                                
                                <button 
                                    className="button-option"
                                    onClick={() => updateFeeling(index)}>✔️</button>
                                <button 
                                    className="button-option"
                                    onClick={() => setEditingIndex(null)}>❌</button>
                               
                            </>
                        ) : (
                            <>
                                {f}
                                <button 
                                    className="button-option"
                                    onClick={() => setEditingIndex(index)}>✏️</button>
                            </>
                        )}
                         {index < feelings.length - 1 && <hr className="hr-settings" />}
                    </ol>
                    
                ))}
            </ol>

            <Link to="/">
                <button type="button" className="submit-button">Mes émotions</button>
            </Link>

            <p className="droits">
                © 2025 myDay. Tous droits réservés. Cette application, ainsi que l’ensemble de son contenu, est protégée par les lois en vigueur relatives à la propriété intellectuelle. Les données qu’elle contient sont chiffrées afin d’en garantir la sécurité.
            </p>
        </div>
    );
}

export default Settings;
