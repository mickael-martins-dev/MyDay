import React, { useState ,useEffect } from 'react';
import './styles/Home.css';
import './styles/Mobile.css';
import { Link } from 'react-router-dom';

function Emotions() {
    console.log("dans /Emotions")

          useEffect(() => {
        
            const fetchUserTheme = async () => {
                try {
                  const API_URL =
                    window.location.hostname === "localhost"
                      ? "http://localhost:4000"
                      : "https://myday-back.onrender.com";
          
                  const response = await fetch(`${API_URL}/user-feelings`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: 'include'
                  });
          
                  const dataFeelings = await response.json();
                //   feeling1=dataFeelings.feelings[0]
                //   feeling2=dataFeelings.feelings[1]
                //   feeling3=dataFeelings.feelings[2]
                //   feeling4=dataFeelings.feelings[3]
                //   console.log("theme dans home !! : ",dataFeelings.theme)
                  document.body.className=dataFeelings.theme
                //   if (dataFeelings && dataFeelings.feelings) {
                //     setFeelings(dataFeelings.feelings);
                //   }
                } catch (error) {
                  console.error("Erreur lors de la récupération des émotions :", error);
                }
              };
          
              fetchUserTheme();
    
          }, []);

    return (
        <div className="container">
            <div className="header">
            <h1>
                <span>m</span><span>y</span><span>D</span><span>a</span><span>y</span>
                </h1>
            </div >
            
            <h5>Derrière la ...</h5>
            
            <div className='emotionsProfils'>
                <img src="/emotionsProfils.jpeg" alt="emotions profils"></img>
            </div>

            <h5>Roues des emotions</h5>

            <div className='rouesDesEmotions'>
                <img src="/rouesDesEmotions.png" alt="Roues des émotions"></img>
            </div>
              

            <Link to="/Settings">
              <button type="button" className="submit-button">
                  Settings
              </button>
             </Link>
             {/* ppppppppppppppppppppppppppppppp */}
             <p className ="droits">© 2025 myDay. Tous droits réservés.
             Cette application, ainsi que l’ensemble de son contenu, est protégée par les lois en vigueur relatives à la propriété intellectuelle. Les données qu’elle contient sont chiffrées afin d’en garantir la sécurité. </p>   
        </div>
    );
}

export default Emotions;
