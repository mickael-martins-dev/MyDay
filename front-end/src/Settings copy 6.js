import React, { useEffect, useState } from 'react';
import './styles/Home.css';
import './styles/Mobile.css';
import { Link } from 'react-router-dom';

function Settings() {
    const [feelings, setFeelings] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [modifiedFeelings, setModifiedFeelings] = useState({});
    const [selectedOption, setSelectedOption] = useState(''); // Ajouté pour gérer le thème
    const [pseudo, setPseudo] = useState("");

    const handleSelectionChange = (e) => {
        console.log("1")
        const newTheme = e.target.value;
        setSelectedOption(newTheme);
        document.body.className = newTheme;
        console.log("theme !!!!! ", newTheme)
        // const pseudo = localStorage.getItem('username',"qs");
        // const pseudo = "aa";
        console.log("localStorage avant /setTheme!!!!! ", localStorage )
        
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
            // setPseudo(data.pseudo);
            console.log("2")
            console.log("--------------->>>>>> >>>>>>>>>> -------------")
            const donnees = data
            console.log("data :", donnees);
            const pseudo2 = data.pseudo;  // Récupérer le pseudo depuis les données
            console.log("pseudo récupéré depuis /getFeelings :", pseudo2);
            console.log("--------------->>>>>> >>>>>>>>>> -------------")
            setPseudo(pseudo2);
        })
        .catch(err => console.error("Erreur en récupérant les émotions :", err));

    // Charger le thème depuis la base
    // const pseudo = localStorage.getItem('username');
    // const pseudo = 'aa';
    console.log("localStorage avant /getTheme!!!!! ", localStorage)
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


    // const updateFeeling = (index) => {
    //     const newFeeling = modifiedFeelings[index];
    //     if (!newFeeling) return;

    //     fetch('/updateFeeling', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ index, newFeeling })
    //     })
    //     .then(res => res.json())
    //     .then(data => {
    //         if (data.success) {
    //             const updatedFeelings = [...feelings];
    //             updatedFeelings[index] = newFeeling;
    //             setFeelings(updatedFeelings);
    //             setEditingIndex(null);
    //             setModifiedFeelings({});
    //         } else {
    //             console.error("Erreur côté serveur :", data.message);
    //         }
    //     })
    //     .catch(err => console.error("Erreur en mettant à jour :", err));
    // };
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
                console.log("updatedFeelings : ",updatedFeelings)
                updatedFeelings[index] = newFeeling;
                console.log("updatedFeelings [index] : ",updatedFeelings[index])
                setFeelings(updatedFeelings);           // met à jour l'affichage
                setEditingIndex(null);                  // quitte le mode édition
                setModifiedFeelings(prev => {
                    const updated = { ...prev };
                    console.log("upadated : ",updated)
                    delete updated[index]; 
                    const del = delete updated[index];
                    console.log("del : ",del)             // nettoie le champ modifié
                    return updated;
                });
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
                    <span>m</span><span>y</span><span>D</span><span>a</span><span>y</span>
                </h1>
            </div>
            
            <h5>Theme : </h5>
            {/* <select id="theme-select" class="theme-select">
            <option value="colorful">Coloré</option>
            <option value="dark">not dev</option>
            </select> */}

            <select id="theme-select" className="theme-select" value={selectedOption} onChange={handleSelectionChange}>
                <option value="colorful">Printemps</option>
                <option value="ocean">Océan</option>
                <option value="dark">Sombre</option>
            </select>

            <h5>Emotions :</h5>
            <ol>
                {/* {feelings.map((f, index) => (
                    <ol key={index}>
                        {editingIndex === index ? (
                            <>
                                <input
                                    className='inputFeelingsSettings'
                                    type="text"
                                    defaultValue={f}
                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                />
                                
                                <button 
                                    className="button-option"
                                    onClick={() => {updateFeeling(index)
                                                    index=false
                                    }
                                    
                                    }>✔️</button>
                                <button 
                                    className="button-option"
                                    onClick={() => {setEditingIndex(null)
                                                    index=false}
                                    }>❌</button>
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
                    
                ))} */}
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
                                    onClick={() => updateFeeling(index)}
                                >✔️</button>
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

           

            <p className="droits">
                © 2025 myDay. Tous droits réservés. Cette application, ainsi que l’ensemble de son contenu, est protégée par les lois en vigueur relatives à la propriété intellectuelle. Les données qu’elle contient sont chiffrées afin d’en garantir la sécurité.
            </p>
        </div>
    );
}

export default Settings;
