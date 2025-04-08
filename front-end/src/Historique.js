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
import zoomPlugin from 'chartjs-plugin-zoom';
ChartJS.register(zoomPlugin);

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
  const [historiqueGratitude, setHistoriqueGratitude] = useState([]);
  const [gratitudeDates, setDatesGratitude] = useState([]);
  const [reglesDates, setReglesDates] = useState([]);
  
  const [showFeeling1, setShowFeeling1] = useState(true);
  const [showFeeling2, setShowFeeling2] = useState(true);
  const [showFeeling3, setShowFeeling3] = useState(true);
  const [showFeeling4, setShowFeeling4] = useState(true);
  const [showRegles, setShowRegles] = useState(true);

  const [timeRange, setTimeRange] = useState('3mois');

const filtrerDonneesParTemps = (data, range) => {
  const maintenant = new Date();
  let limite;

  switch (range) {
    case '1semaine':
      limite = new Date(maintenant.setDate(maintenant.getDate() - 7));
      break;
      case '2semaine':
      limite = new Date(maintenant.setDate(maintenant.getDate() - 14));
      break;
    case '1mois':
      // limite = new Date(maintenant.setMonth(maintenant.getMonth() - 1));
      limite = new Date(maintenant.setMonth(maintenant.getMonth() - 1));
      break;
    case '3mois':
      // limite = new Date(maintenant.setMonth(maintenant.getMonth() - 3));
      limite = new Date(maintenant.setMonth(maintenant.getMonth() - 3));
      break;
    case '6mois':
      // limite = new Date(maintenant.setMonth(maintenant.getMonth() - 6));
      limite = new Date(maintenant.setMonth(maintenant.getMonth() - 6));
      break;
    default:
      return data;
  }

  return data.filter(entry => new Date(entry.userLocalDate) >= limite);
};


  // useEffect(() => {
  //   const fetchUserFeelingsAndHistory = async () => {
  //     try {
  //       const API_URL =
  //         window.location.hostname === "localhost"
  //           ? "http://localhost:4000"
  //           : "https://myday-back.onrender.com";

  //       const feelingsResponse = await fetch(`${API_URL}/user-feelings`, {
  //         method: "GET",
  //         headers: { "Content-Type": "application/json" },
  //         credentials: 'include'
  //       });

  //       const feelingsData = await feelingsResponse.json();
  //       if (feelingsData && feelingsData.feelings) {
  //         setFeelings(feelingsData.feelings);
  //         setPhraseGratitude(feelingsData.phraseGratitude || []);
  //         setReglesDates(feelingsData.regles || []);
  //       }

  //       const historyResponse = await axios.get(`${API_URL}/user-history`, {
  //         withCredentials: true,
  //       });

  //       const historyData = historyResponse.data;
  //       historyData.sort((a, b) => new Date(a.userLocalDate) - new Date(b.userLocalDate));

  //       const labels = historyData.map(entry => {
  //         const date = new Date(entry.userLocalDate);
  //         return date.toLocaleDateString('fr-FR', {
  //           day: '2-digit',
  //           month: 'short',
  //         });
  //       });

  //       const gratitudeHistory = historyData
  //         .map(entry => entry.phraseGratitude)
  //         .filter(phrase => phrase && phrase.trim() !== "");

  //       const gratitudeDates = historyData
  //         .map(entry => new Date(entry.userLocalDate).toLocaleDateString())
  //         .filter((_, index) => gratitudeHistory[index]);

  //       setDatesGratitude(gratitudeDates);
  //       setHistoriqueGratitude(gratitudeHistory);

  //       const data = {
  //         labels,
  //         datasets: [
  //           {
  //             label: feelings[0],
  //             data: historyData.map(entry => entry.feeling1),
  //             borderColor: 'rgba(75, 192, 192, 1)',
  //             borderWidth: 2,
  //             pointRadius: 1,
  //             pointHoverRadius: 4,
  //             fill: false,
  //             hidden: !showFeeling1
  //           },
  //           {
  //             label: feelings[1],
  //             data: historyData.map(entry => entry.feeling2),
  //             borderColor: 'rgba(153, 102, 255, 1)',
  //             borderWidth: 2,
  //             pointRadius: 1,
  //             pointHoverRadius: 4,
  //             fill: false,
  //             hidden: !showFeeling2
  //           },
  //           {
  //             label: feelings[2],
  //             data: historyData.map(entry => entry.feeling3),
  //             borderColor: 'rgba(255, 99, 132, 1)',
  //             borderWidth: 2,
  //             pointRadius: 1,
  //             pointHoverRadius: 4,
  //             fill: false,
  //             hidden: !showFeeling3
  //           },
  //           {
  //             label: feelings[3],
  //             data: historyData.map(entry => entry.feeling4),
  //             borderColor: 'rgba(255, 206, 86, 1)',
  //             borderWidth: 2,
  //             pointRadius: 1,
  //             pointHoverRadius: 4,
  //             fill: false,
  //             hidden: !showFeeling4
  //           },
  //           {
  //             label: 'Règles',
  //             data: reglesDates.map((regle, index) => {
  //               return regle === true ? 0 : null;
  //             }),
  //             borderColor: 'rgba(0, 0, 0, 1)',
  //             backgroundColor: 'rgba(0, 0, 0, 1)',
  //             borderWidth: 4,
  //             pointRadius: 4,
  //             pointHoverRadius: 4,
  //             fill: true,
  //             hidden: !showRegles
  //           }
  //         ],
  //       };

  //       setChartData(data);
  //     } catch (error) {
  //       console.error("Erreur lors de la récupération des données :", error);
  //     }
  //   };

  //   fetchUserFeelingsAndHistory();
  // }, [feelings, reglesDates, showFeeling1, showFeeling2, showFeeling3, showFeeling4, showRegles]);

  useEffect(() => {
    const fetchUserFeelingsAndHistory = async () => {
      try {
        const API_URL =
          window.location.hostname === "localhost"
            ? "http://localhost:4000"
            : "https://myday-back.onrender.com";
  
        const feelingsResponse = await fetch(`${API_URL}/user-feelings`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: 'include'
        });
  
        const feelingsData = await feelingsResponse.json();
        if (feelingsData && feelingsData.feelings) {
          // Ne relance pas setFeelings inutilement si les valeurs sont déjà identiques
          setFeelings(prev => JSON.stringify(prev) !== JSON.stringify(feelingsData.feelings) ? feelingsData.feelings : prev);
          setPhraseGratitude(feelingsData.phraseGratitude || []);
          setReglesDates(feelingsData.regles || []);
        }
  
        const historyResponse = await axios.get(`${API_URL}/user-history`, {
          withCredentials: true,
        });
  
        const historyData = historyResponse.data;
        historyData.sort((a, b) => new Date(b.userLocalDate) - new Date(a.userLocalDate));
        const filteredHistory = filtrerDonneesParTemps(historyData, timeRange);
        const labels = filteredHistory.map(entry => {
          const date = new Date(entry.userLocalDate);
          return date.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: 'short',
          });
        });
  
        const gratitudeHistory = historyData
          .map(entry => entry.phraseGratitude)
          .filter(phrase => phrase && phrase.trim() !== "");
  
        const gratitudeDates = historyData
          .map(entry => new Date(entry.userLocalDate).toLocaleDateString())
          .filter((_, index) => gratitudeHistory[index]);
  
        setDatesGratitude(gratitudeDates);
        setHistoriqueGratitude(gratitudeHistory);
  
        const data = {
          labels,
          datasets: [
            {
              label: feelingsData.feelings[0],
              data: historyData.map(entry => entry.feeling1),
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 2,
              pointRadius: 1,
              pointHoverRadius: 4,
              fill: false,
              hidden: !showFeeling1
            },
            {
              label: feelingsData.feelings[1],
              data: historyData.map(entry => entry.feeling2),
              borderColor: 'rgba(153, 102, 255, 1)',
              borderWidth: 2,
              pointRadius: 1,
              pointHoverRadius: 4,
              fill: false,
              hidden: !showFeeling2
            },
            {
              label: feelingsData.feelings[2],
              data: historyData.map(entry => entry.feeling3),
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 2,
              pointRadius: 1,
              pointHoverRadius: 4,
              fill: false,
              hidden: !showFeeling3
            },
            {
              label: feelingsData.feelings[3],
              data: historyData.map(entry => entry.feeling4),
              borderColor: 'rgba(255, 206, 86, 1)',
              borderWidth: 2,
              pointRadius: 1,
              pointHoverRadius: 4,
              fill: false,
              hidden: !showFeeling4
            },
            {
              label: 'Règles',
              data: feelingsData.regles?.map((regle) => (regle === true ? 0 : null)) || [],
              borderColor: 'rgba(0, 0, 0, 1)',
              backgroundColor: 'rgba(0, 0, 0, 1)',
              borderWidth: 4,
              pointRadius: 4,
              pointHoverRadius: 4,
              fill: true,
              hidden: !showRegles
            }
          ],
        };
  
        setChartData(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };
  
    fetchUserFeelingsAndHistory();
  }, [showFeeling1, showFeeling2, showFeeling3, showFeeling4, showRegles,timeRange]);
  

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          font: {
            weight: 'bold',
          },
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: {
            size: 14,
            family: 'Arial',
            weight: 'bold',
          },
          boxWidth: 15,
          boxHeight: 5,
          padding: 20,
          color: '#333',
        },
      },
      zoom: {
        pan: {
          enabled: true,
          mode: 'x',
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true
          },
          mode: 'x',
        },
      },
    },
  };

  return (
    <div>
      <div className="container">
        <h6>Historique des Émotions</h6>
        <div className="time-filter">
          <button onClick={() => setTimeRange('1semaine')}>1 semaine</button>
          <button onClick={() => setTimeRange('2semaine')}>2 semaines</button>
          <button onClick={() => setTimeRange('1mois')}>1 mois</button>
          <button onClick={() => setTimeRange('3mois')}>3 mois</button>
          <button onClick={() => setTimeRange('6mois')}>6 mois</button>
          <button onClick={() => setTimeRange('tout')}>Tout</button>
        </div>
        <div className="chart-container">
          {chartData.labels && <Line data={chartData} options={options} />}
        </div>
        

        {/* <div className="checkbox-container">
          <label>
            <input
              type="checkbox"
              checked={showFeeling1}
              onChange={() => setShowFeeling1(!showFeeling1)}
            />
            {feelings[0]}
          </label>
          <label>
            <input
              type="checkbox"
              checked={showFeeling2}
              onChange={() => setShowFeeling2(!showFeeling2)}
            />
            {feelings[1]}
          </label>
          <label>
            <input
              type="checkbox"
              checked={showFeeling3}
              onChange={() => setShowFeeling3(!showFeeling3)}
            />
            {feelings[2]}
          </label>
          <label>
            <input
              type="checkbox"
              checked={showFeeling4}
              onChange={() => setShowFeeling4(!showFeeling4)}
            />
            {feelings[3]}
          </label>
          <label>
            <input
              type="checkbox"
              checked={showRegles}
              onChange={() => setShowRegles(!showRegles)}
            />
            Menstruation
          </label>
        </div> */}
        <div className="checkbox-container">
          <label>
            <input
              type="checkbox"
              checked={showFeeling1}
              onChange={() => setShowFeeling1(!showFeeling1)}
            />
            {feelings[0]}
          </label>
          <label>
            <input
              type="checkbox"
              checked={showFeeling2}
              onChange={() => setShowFeeling2(!showFeeling2)}
            />
            {feelings[1]}
          </label>
          <label>
            <input
              type="checkbox"
              checked={showFeeling3}
              onChange={() => setShowFeeling3(!showFeeling3)}
            />
            {feelings[2]}
          </label>
          <label>
            <input
              type="checkbox"
              checked={showFeeling4}
              onChange={() => setShowFeeling4(!showFeeling4)}
            />
            {feelings[3]}
          </label>
          <label>
            <input
              type="checkbox"
              checked={showRegles}
              onChange={() => setShowRegles(!showRegles)}
            />
            Règles
          </label>
        </div>


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
        <div className="button-container">
          <LogoutButton />
        </div>
        <p className ="droits">© 2025 myDay. Tous droits réservés.
        Cette application et son contenu sont protégés par les lois en vigueur sur la propriété intellectuelle. </p>
      </div>
      
    </div>
  );
};

export default Historique;
