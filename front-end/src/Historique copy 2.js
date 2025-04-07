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

  useEffect(() => {
    const fetchUserFeelings = async () => {
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
        // console.log("bla",dataFeelings.phraseGratitude ) // S'assurer que phraseGratitude est un tableau

        if (dataFeelings && dataFeelings.feelings) {
          setFeelings(dataFeelings.feelings);  // Met à jour l'état avec les émotions
          setPhraseGratitude(dataFeelings.phraseGratitude || []);
          // console.log("bla",dataFeelings) 
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des émotions :", error);
      }
    };

    // const fetchUsePhraseGratitude = async () => {
    //   try {
    //     const API_URL =
    //       window.location.hostname === "localhost"
    //         ? "http://localhost:4000"
    //         : "https://myday-back.onrender.com";

    //     const response = await fetch(`${API_URL}/user-phraseGratitude`, {
    //       method: "GET",
    //       headers: { "Content-Type": "application/json" },
    //       credentials: 'include'
    //     });

    //     const dataFeelings = await response.json();
    //     // console.log("bla",dataFeelings.phraseGratitude ) // S'assurer que phraseGratitude est un tableau

    //     if (dataFeelings && dataFeelings.phraseGratitude) {
    //       setFeelings(dataFeelings.feelings);  // Met à jour l'état avec les émotions
    //       setHistoriqueGratitude(dataFeelings.phraseGratitude || []);
    //       // console.log("bla",dataFeelings) 
    //     }
    //   } catch (error) {
    //     console.error("Erreur lors de la récupération des émotions :", error);
    //   }
    // };

    fetchUserFeelings();
    // fetchUsePhraseGratitude();

    const fetchHistory = async () => {
      try {
        const API_URL =
          window.location.hostname === "localhost"
            ? "http://localhost:4000"
            : "https://myday-back.onrender.com";

        const response = await axios.get(`${API_URL}/user-history`, {
          withCredentials: true,
        });

        const historyData = response.data;
        const labels = historyData.map(entry => new Date(entry.userLocalDate).toLocaleDateString());

        // Récupérer l'historique des phrases de gratitude
        const gratitudeHistory = historyData.map(entry => entry.gratitudePhrase);

        setHistoriqueGratitude(gratitudeHistory); // Mettre à jour l'historique des phrases de gratitude

        const data = {
          labels,
          datasets: [
            {
              label: feelings[0],
              data: historyData.map(entry => entry.feeling1),
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,         // 🔹 ligne fine
              pointRadius: 1,         // 🔹 petits points
              pointHoverRadius: 4,    // 🔹 taille des points au survol
              fill: false,
            },
            {
              label: feelings[1],
              data: historyData.map(entry => entry.feeling2),
              borderColor: 'rgba(153, 102, 255, 1)',
              borderWidth: 1,         // 🔹 ligne fine
              pointRadius: 1,         // 🔹 petits points
              pointHoverRadius: 4,    // 🔹 taille des points au survol
              fill: false,
            },
            {
              label: feelings[2],
              data: historyData.map(entry => entry.feeling3),
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,         // 🔹 ligne fine
              pointRadius: 1,         // 🔹 petits points
              pointHoverRadius: 4,    // 🔹 taille des points au survol
              fill: false,
            },
            {
              label: feelings[3],
              data: historyData.map(entry => entry.feeling4),
              borderColor: 'rgba(255, 206, 86, 1)',
              borderWidth: 1,         // 🔹 ligne fine
              pointRadius: 1,         // 🔹 petits points
              pointHoverRadius: 4,    // 🔹 taille des points au survol
              fill: false,
            },
          ],
        };

        setChartData(data);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'historique :", error);
      }
    };

    fetchHistory();
  }, [feelings]);

  const options = {
    scales: {
      x: {
        ticks: {
          font: {
            weight: 'bold', // Rendre les labels en gras
          },
        },
      },
    },
  };

  return (
    <div>
      <div className="container">
        <h6>Historique des Émotions</h6>
        {chartData.labels && (
          <Line data={chartData} options={options} />
        )}
        <Link to="/">
          <button type="button" className="submit-button">
            Emotions
          </button>
        </Link>
        <div className='button-container'>
          <LogoutButton />
        </div>

        {/* Afficher l'historique des phrases de gratitude sous le graphique */}
        <div className="historique-gratitude">
          <h6>Historique des Phrases de Gratitude</h6>
          <ul>
            {historiqueGratitude.length > 0 ? (
              historiqueGratitude.map((phrase, index) => (
                <li key={index}>{phrase}</li>
              ))
            ) : (
              <li>Aucune phrase de gratitude disponible</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Historique;
