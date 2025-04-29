import React, { useEffect, useState } from 'react';
import './styles/Home.css';
import './styles/Mobile.css';
import { Link } from 'react-router-dom';

function Settings() {
    const [feelings, setFeelings] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [modifiedFeelings, setModifiedFeelings] = useState({});
    const [selectedOption, setSelectedOption] = useState('');
    const [pseudo, setPseudo] = useState("");
    const [notification, setNotification] = useState('');

    const handleSelectionChange = (e) => {
        console.log("1")
        const newTheme = e.target.value;
        setSelectedOption(newTheme);
        document.body.className = newTheme;
        
        if (pseudo) {
            fetch('/setTheme', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pseudo, theme: newTheme }),
            })
            .then(res => res.json())
            .then(data => {
                console.log("set theme data",data)
                if (!data.success) {
                    console.error("Échec de l'enregistrement du thème.");
                }
            })
            .catch(err => console.error("Erreur en envoyant le thème :", err));
        }
    };
    

    useEffect(() => {
        
        fetch('/getFeelings')
        .then(res => res.json())
        .then(data => {

            setFeelings(data.feelings)
            const donnees = data
            const pseudo2 = data.pseudo; 
            setPseudo(pseudo2);
        })
        .catch(err => console.error("Erreur en récupérant les émotions :", err));

    if (pseudo) {
        fetch('/getTheme', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pseudo })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success && data.theme) {
                setSelectedOption(data.theme);
                document.body.className = data.theme;
            }
        })
     
        .catch(err => console.error("Erreur en récupérant le thème :", err));
    }
    }, []);

    useEffect(() => {
        if (pseudo) {
            fetch('/getTheme', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pseudo })
            })
            .then(res => res.json())
            .then(data => {
                if (data.success && data.theme) {
                    setSelectedOption(data.theme);
                    document.body.className = data.theme;
                }
            })
            .catch(err => console.error("Erreur en récupérant le thème :", err));
        }
    }, [pseudo]); // Se déclenche uniquement quand pseudo est défini
    

    const handleInputChange = (index, value) => {
        setModifiedFeelings(prev => ({
            ...prev,
            [index]: value
        }));
    };

    const updateFeeling = (index) => {
        const newFeeling = modifiedFeelings[index];
        if (!newFeeling) return;

        const updatedFeelings = [...feelings];
        updatedFeelings[index] = newFeeling;
        setFeelings(updatedFeelings);
    
        fetch('/updateFeeling', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ index, newFeeling })
        })
        .then(res => res.json())
        .then(data => {
            if (!data.success) {
                setNotification("Émotion modifiée !");
                setTimeout(() => setNotification(''), 3000);

            } else {
                setEditingIndex(null);
                setModifiedFeelings(prev => {
                    const updated = { ...prev };
                    delete updated[index];
                    return updated;
                });
            }
        })
        .catch(err => {
            console.error("Erreur en mettant à jour :", err);
        });
    };
    
    
    return (
        <div className="container">
            <div className="header">
                <h1>
                    <span>m</span><span>y</span><span>D</span><span>a</span><span>y</span>
                </h1>
            </div>
            
            <h5>Theme : </h5>

            <select id="theme-select" className="theme-select" value={selectedOption} onChange={handleSelectionChange}>
                <option value="colorful">Printemps</option>
                <option value="ocean">Océan</option>
                <option value="dark">Sombre</option>
            </select>

            <h5>Emotions :</h5>
            <ol>
                {feelings.map((f, index) => (
                    <ol key={index}>
                        {editingIndex === index ? (
                            <>
                                <input
                                    className='inputFeelingsSettings'
                                    type="text"
                                    value={modifiedFeelings[index] ?? f}
                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                />
                                <button 
                                    className="button-option"
                                    onClick={() => {
                                        updateFeeling(index)
                                        setModifiedFeelings(prev => {
                                            const updated = { ...prev };
                                            delete updated[index];
                                            setTimeout(() => {
                                                setEditingIndex(null);
                                            }, 3000);
                                            
                                            return updated;
                                            
                                        });
                                        }
                                    }    
                                >✔️
                                </button>
                               
                                <button 
                                    className="button-option"
                                    onClick={() => {
                                        setEditingIndex(null);
                                        setModifiedFeelings(prev => {
                                            const updated = { ...prev };
                                            delete updated[index];
                                            return updated;
                                        });
                                    }}
                                >❌</button>
                                 {notification && <div className="popup-success-emotions">{notification}</div>}
                            </>
                        ) : (
                            <>
                                {f}
                                <button 
                                    className="button-option"
                                    onClick={() => setEditingIndex(index)}
                                >✏️</button>
                            </>
                        )}
                        {index < feelings.length - 1 && <hr className="hr-settings" />}
                    </ol>
                ))}

            </ol>

            <Link to="/EmotionsSettings">
                <button type="button" className="submit-button">Roue des émotions</button>
            </Link>

            <hr className="hr" />

            <Link to="/">
                <button type="button" className="submit-button">Mes émotions</button>
            </Link>
            <hr className="hr" />

            <Link to="/DelUser">
                <button type="button" className="submit-button-supprimer">Supprimer compte</button>
            </Link>

            <p className="droits">
                © 2025 myDay. Tous droits réservés. Cette application, ainsi que l’ensemble de son contenu, est protégée par les lois en vigueur relatives à la propriété intellectuelle. Les données qu’elle contient sont chiffrées afin d’en garantir la sécurité.
            </p>
        </div>
    );
}

export default Settings;
