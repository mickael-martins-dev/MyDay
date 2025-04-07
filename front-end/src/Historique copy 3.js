import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import LogoutButton from './LogoutButton'; // Importer le composant LogoutButton
import { Link } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Historique = () => {
  const [chartData, setChartData] = useState({});
  const [feelings, setFeelings] = useState(["", "", "", ""]);
  const [phraseGratitude, setPhraseGratitude] = useState("");
  const [historiqueGratitude, setHistoriqueGratitude] = useState([]); // Nouveau state pour l'historique des phrases de gratitude
  const [gratitudeDates, setDatesGratitude] = useState([]); // 
  // Historique des dates
  const [reglesDates, setReglesDates] = useState([]); // Ajouter ce state pour les règles
  useEffect(() => {

    
    const fetchUserFeelingsAndHistory = async () => {
      try {
        const API_URL =
          window.location.hostname === "localhost"
            ? "http://localhost:4000"
            : "https://myday-back.onrender.com";

        // Récupérer les émotions et les phrases de gratitude de l'utilisateur
        const feelingsResponse = await fetch(`${API_URL}/user-feelings`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: 'include'
        });

        const feelingsData = await feelingsResponse.json();
        // console.log("Données reçues :", feelingsData)
        if (feelingsData && feelingsData.feelings) {
          setFeelings(feelingsData.feelings); // Met à jour l'état avec les émotions
          setPhraseGratitude(feelingsData.phraseGratitude || []);
          setReglesDates(feelingsData.regles || []); // Mettre à jour 
          // les règles
          // console.log("Règles récupérées:", feelingsData.regle); // Log pour les règles
        }
        // console.log("Règles mises à jour:", reglesDates);


        // Récupérer l'historique des émotions
        const historyResponse = await axios.get(`${API_URL}/user-history`, {
          withCredentials: true,
        });

        const historyData = historyResponse.data;
        // const labels = historyData.map(entry => new Date(entry.userLocalDate).toLocaleDateString());
        const labels = historyData.map(entry => {
          const date = new Date(entry.userLocalDate);
          return date.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: 'short', // 'short' pour un mois abrégé, ex. "jan" pour janvier
          });
        });
        const gratitudeHistory = historyData
          .map(entry => entry.phraseGratitude)
          .filter(phrase => phrase && phrase.trim() !== "");  // Filtrer les phrases vides ou non définies

        const gratitudeDates = historyData
          .map(entry => new Date(entry.userLocalDate).toLocaleDateString())
          .filter((_, index) => gratitudeHistory[index]);
        // setDatesGratitude(gratitudeDates);
 // Convertir en date lisible
        setDatesGratitude(gratitudeDates);
        // console.log("historyData",historyData)
        setHistoriqueGratitude(gratitudeHistory); // Mettre à jour l'historique des phrases de gratitude

        const data = {
          labels,
          datasets: [
            {
              label: feelings[0],
              data: historyData.map(entry => entry.feeling1),
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 2,
              pointRadius: 1,
              pointHoverRadius: 4,
              fill: false,
            },
            {
              label: feelings[1],
              data: historyData.map(entry => entry.feeling2),
              borderColor: 'rgba(153, 102, 255, 1)',
              borderWidth: 2,
              pointRadius: 1,
              pointHoverRadius: 4,
              fill: false,
            },
            {
              label: feelings[2],
              data: historyData.map(entry => entry.feeling3),
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 2,
              pointRadius: 1,
              pointHoverRadius: 4,
              fill: false,
            },
            {
              label: feelings[3],
              data: historyData.map(entry => entry.feeling4),
              borderColor: 'rgba(255, 206, 86, 1)',
              borderWidth: 2,
              pointRadius: 1,
              pointHoverRadius: 4,
              fill: false,
            },
            {
              label: 'Menstruation',
              data: reglesDates.map((regle, index) => {
                // Assurez-vous que regle est une valeur valide (1 pour activée, null ou autre pour non activée)
                return regle === true ? 1 : null; // Retourne 1 pour afficher un point, sinon null
              }),
              borderColor: 'rgba(0, 0, 0, 1)', // Couleur noire
              backgroundColor: 'rgba(0, 0, 0, 1)', // Noir aussi pour la couleur de fond
              borderWidth: 2,
              pointRadius: 2, // Taille du point
              pointHoverRadius: 5,
              fill: true, // Assurez-vous que la couleur est remplie sous la ligne si nécessaire
            }
          ],
        };

        setChartData(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchUserFeelingsAndHistory();
  }, [feelings,reglesDates]);

  // const options = {
  //   scales: {
  //     x: {
  //       ticks: {
  //         font: {
  //           weight: 'bold', // Rendre les labels en gras
  //         },
  //       },
  //     },
  //   },
  // };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          font: {
            weight: 'bold', // Rendre les labels en gras
          },
        },
      },
    },
    plugins: {
      legend: {
        display: true, // Assure-toi que la légende est affichée
        position: 'top', // Positionner la légende en haut du graphique
        labels: {
          font: {
            size: 14, // Taille de la police de la légende
            family: 'Arial', // Police de la légende
            weight: 'bold', // Rendre les étiquettes en gras
          },
          boxWidth: 15, // Largeur du carré dans la légende
          boxHeight: 5, // Hauteur du carré dans la légende
          padding: 20, // Espacement entre l'étiquette et le carré
          color: '#333', // Couleur du texte de la légende
        },
      },
    },
  }

  // const options = {
  //   scales: {
  //     x: {
  //       ticks: {
  //         font: {
  //           weight: 'bold', // Rendre les labels en gras
  //         },
  //       },
  //     },
  //   },
  //   plugins: {
  //     legend: {
  //       display: true, // Assure-toi que la légende est affichée
  //       position: 'top', // Positionner la légende en haut du graphique
  //       labels: {
  //         generateLabels: (chart) => {
  //           return chart.data.datasets.map((dataset, i) => {
  //             // Personnalisation de l'étiquette
  //             return {
                
  //               fillStyle: dataset.borderColor, // Utiliser la couleur de la bordure du dataset pour le trait
  //               strokeStyle: dataset.borderColor, // La même couleur pour le contour du trait
  //               lineWidth: 2, // Largeur du trait
  //               hidden: false, // Garder l'élément visible
  //               index: i,
  //             };
  //           });
  //         },
  //         boxWidth: 5, // Largeur du carré (l'élément de la légende)
  //         padding: 10, // Espacement entre les éléments de légende
  //       },
  //     },
  //   },
  // };

  // return (
  //   <div>
  //     <div className="container">
  //       <h6>Historique des Émotions</h6>
  //       {chartData.labels && (
  //         <Line data={chartData} options={options} />
  //       )}


  //       {/* Afficher l'historique des phrases de gratitude sous le graphique */}
  //       <div className="historique-gratitude">
  //         <div className='h7'>Historique des mantras</div>
  //         {/* <ul> */}
  //         <div className='fenetre-gratitude'>

  //             {historiqueGratitude.length > 0 ? (
  //                 historiqueGratitude.map((phrase, index) => (
  //                   <div key={index}>
  //                     <p>{phrase} : (<em>{gratitudeDates[index]})</em></p> {/* Display the corresponding date */}
  //                     <hr className="hr-phraseGratitude" />
  //                   </div>
  //                 ))
  //               ) : (
  //                 <li>Aucune phrase de gratitude disponible</li>
  //               )}
 
  //         </div>
            
  //         {/* </ul> */}
  //       </div>
  //       <Link to="/">
  //         <button type="button" className="submit-button-history">
  //           Emotions
  //         </button>
  //       </Link>
  //       <div className='button-container'>
  //         <LogoutButton />
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <div>
      <div className="container">
        <h6>Historique des Émotions</h6>
        
        {/* Applique la classe chart-container */}
        <div className="chart-container">
          {chartData.labels && (
            <Line data={chartData} options={options} />
          )}
        </div>
  
        {/* Afficher l'historique des phrases de gratitude sous le graphique */}
        <div className="historique-gratitude">
          <div className='h7'>Historique des mantras</div>
  
          <div className='fenetre-gratitude'>
            {historiqueGratitude.length > 0 ? (
              historiqueGratitude.map((phrase, index) => (
                <div key={index}>
                  <p>{phrase} : (<em>{gratitudeDates[index]})</em></p>
                  <hr className="hr-phraseGratitude" />
                </div>
              ))
            ) : (
              <li>Aucune phrase de gratitude disponible</li>
            )}
          </div>
        </div>
        <Link to="/">
          <button type="button" className="submit-button-history">
            Emotions
          </button>
        </Link>
        <div className='button-container'>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
  
};

export default Historique;
