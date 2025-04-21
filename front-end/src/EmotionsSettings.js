import React, { useState } from 'react';
import './styles/Home.css';
import './styles/Mobile.css';
import { Link } from 'react-router-dom';

function Emotions() {
    console.log("dans /Emotions")

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
