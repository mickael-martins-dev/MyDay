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
  const[theme,setTheme]=useState("")
  // const[options,setOptions]=useState({})
  
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
    case '24heures':
      limite = new Date(maintenant.setHours(maintenant.getHours() - 24));
      break;
    case '1semaine':
      limite = new Date(maintenant.setDate(maintenant.getDate() - 7));
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

  useEffect(() => {
    window.scrollTo(0, 0);
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
        console.log("theme dans historique !! : ",feelingsData.theme)
        // document.body.className = feelingsData.theme;
        setTheme(feelingsData.theme)
        // setOptions(feelingsData.theme)
        document.body.className = feelingsData.theme;
        // cons.log("feelingsData  :",feelingsData )
        if (feelingsData && feelingsData.feelings) {
          // Ne relance pas setFeelings inutilement si les valeurs sont déjà identiques
          setFeelings(prev => JSON.stringify(prev) !== JSON.stringify(feelingsData.feelings) ? feelingsData.feelings : prev);
          console.log("feelingsData.feelings : ",feelingsData.feelings)
          setPhraseGratitude(feelingsData.phraseGratitude || []);
          setReglesDates(feelingsData.regles || []);
        }
  
        const historyResponse = await axios.get(`${API_URL}/user-history`, {
          withCredentials: true,
        });
        // conseol.log("historyResponse :",historyResponse)
        const historyData = historyResponse.data;
        console.log("histroryData : ",historyData)
        // historyData.sort((a, b) => new Date(a.userLocalDate) - new Date(b.userLocalDate));
        historyData.sort((a, b) => new Date(a.userLocalDate) - new Date(b.userLocalDate));
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
        let data={}
        if(feelingsData.theme==="dark"){
        data = {
          labels,
          datasets: [
            {
              label: feelingsData.feelings[0],
              // data: historyData.map(entry => entry.feeling1),
              data: historyData.map(entry => entry.feeling1 ?? null),
              borderColor: 'rgba(75, 192, 192, 1)',  // Turquoise
              // borderColor: 'rgb(255, 255, 255)', 
              borderWidth: 2,
              pointRadius: 4,  // Plus grand pour mieux se voir
              pointHoverRadius: 8,
              pointStyle: 'circle',  // Type de point : Cercle
              fill: false,
              hidden: !showFeeling1,
              spanGaps: false,
            },
            {
              label: feelingsData.feelings[1],
              // data: historyData.map(entry => entry.feeling2),
              data: historyData.map(entry => entry.feeling2 ?? null),
              borderColor: 'rgba(153, 102, 255, 1)',  // Violet
              // borderColor: 'rgb(255, 255, 255)',
              borderWidth: 2,
              pointRadius: 4,
              pointHoverRadius: 8,
              pointStyle: 'triangle',  // Type de point : Triangle
              fill: false,
              hidden: !showFeeling2,
              spanGaps: false,
            },
            {
              label: feelingsData.feelings[2],
              // data: historyData.map(entry => entry.feeling3),
              data: historyData.map(entry => entry.feeling3 ?? null),
              borderColor: 'rgba(255, 99, 132, 1)',  // Rose
              // borderColor: 'rgb(255, 255, 255)',
              borderWidth: 2,
              pointRadius: 4,
              pointHoverRadius: 8,
              pointStyle: 'rect',  // Type de point : Carré
              fill: false,
              hidden: !showFeeling3,
              spanGaps: false,
            },
            {
              label: feelingsData.feelings[3],
              // data: historyData.map(entry => entry.feeling4),
              data: historyData.map(entry => entry.feeling4 ?? null),
              borderColor: 'rgba(255, 206, 86, 1)',  // Jaune
              // borderColor: 'rgb(255, 255, 255)',
              borderWidth: 2,
              pointRadius: 4,
              pointHoverRadius: 8,
              pointStyle: 'star',  // Type de point : Étoile
              fill: false,
              hidden: !showFeeling4,
              spanGaps: false,
            },
            {
              label: 'Règles',
              data: feelingsData.regles?.map((regle) => (regle === true ? 0 : null)) || [],
              // borderColor: 'rgb(255, 255, 255)',
              backgroundColor: 'rgb(240, 78, 210)',
              borderColor: 'rgb(223, 215, 215)',
              borderWidth: 2,
              pointRadius: 4,
              pointHoverRadius: 4,
              fill: true,
              hidden: !showRegles
            }
          ],
        };
        }else
        {
        // data = {
        //   labels,
        //   datasets: [
        //     {
        //       label: feelingsData.feelings[0],
        //       // data: historyData.map(entry => entry.feeling1),
        //       data: historyData.map(entry => entry.feeling1 ?? null),
        //       borderColor: 'rgba(75, 192, 192, 1)',  // Turquoise
        //       borderWidth: 2,
        //       pointRadius: 4,  // Plus grand pour mieux se voir
        //       pointHoverRadius: 8,
        //       pointStyle: 'circle',  // Type de point : Cercle
        //       fill: false,
        //       hidden: !showFeeling1,
        //       spanGaps: false,
        //     },
        //     {
        //       label: feelingsData.feelings[1],
        //       // data: historyData.map(entry => entry.feeling3),
        //       data: historyData.map(entry => entry.feeling2 ?? null),
        //       borderColor: 'rgba(153, 102, 255, 1)',  // Violet
        //       borderWidth: 2,
        //       pointRadius: 4,
        //       pointHoverRadius: 8,
        //       pointStyle: 'triangle',  // Type de point : Triangle
        //       fill: false,
        //       hidden: !showFeeling2,
        //       spanGaps: false,
        //     },
        //     {
        //       label: feelingsData.feelings[2],
        //       // data: historyData.map(entry => entry.feeling3),
        //       data: historyData.map(entry => entry.feeling3 ?? null),
        //       borderColor: 'rgba(255, 99, 132, 1)',  // Rose
        //       borderWidth: 2,
        //       pointRadius: 4,
        //       pointHoverRadius: 8,
        //       pointStyle: 'rect',  // Type de point : Carré
        //       fill: false,
        //       hidden: !showFeeling3,
        //       spanGaps: false,
        //     },
        //     {
        //       label: feelingsData.feelings[3],
        //       // data: historyData.map(entry => entry.feeling4),
        //       data: historyData.map(entry => entry.feeling4 ?? null),
        //       borderColor: 'rgba(255, 206, 86, 1)',  // Jaune
        //       borderWidth: 2,
        //       pointRadius: 4,
        //       pointHoverRadius: 8,
        //       pointStyle: 'star',  // Type de point : Étoile
        //       fill: false,
        //       hidden: !showFeeling4,
        //       spanGaps: false,
        //     },
        //     {
        //       label: 'Règles',
        //       data: feelingsData.regles?.map((regle) => (regle === true ? 0 : null)) || [],
        //       borderColor: 'rgb(0, 0, 0)',
        //       backgroundColor: 'rgb(0, 0, 0)',
        //       borderWidth: 2,
        //       pointRadius: 4,
        //       pointHoverRadius: 4,
        //       fill: true,
        //       hidden: !showRegles
        //     }
        //   ],
        // };
      
        data = {
          labels,
          datasets: [
            {
              label: feelingsData.feelings[0],
              data: historyData.map(entry => entry.feeling1 ?? null),
              borderColor: 'rgba(75, 192, 192, 1)',  // Turquoise
              borderWidth: 2,
              pointRadius: 4,
              pointHoverRadius: 8,
              pointStyle: 'circle',
              fill: false,
              hidden: !showFeeling1,
              spanGaps: false,
            },
            {
              label: feelingsData.feelings[1],
              data: historyData.map(entry => entry.feeling2 ?? null),
              borderColor: 'rgba(153, 102, 255, 1)',  // Violet
              borderWidth: 2,
              pointRadius: 4,
              pointHoverRadius: 8,
              pointStyle: 'triangle',
              fill: false,
              hidden: !showFeeling2,
              spanGaps: false,
            },
            {
              label: feelingsData.feelings[2],
              data: historyData.map(entry => entry.feeling3 ?? null),
              borderColor: 'rgba(255, 99, 132, 1)',  // Rose
              borderWidth: 2,
              pointRadius: 4,
              pointHoverRadius: 8,
              pointStyle: 'rect',
              fill: false,
              hidden: !showFeeling3,
              spanGaps: false,
            },
            {
              label: feelingsData.feelings[3],
              data: historyData.map(entry => entry.feeling4 ?? null),
              borderColor: 'rgba(255, 206, 86, 1)',  // Jaune
              borderWidth: 2,
              pointRadius: 4,
              pointHoverRadius: 8,
              pointStyle: 'star',
              fill: false,
              hidden: !showFeeling4,
              spanGaps: false,
            },
            {
              label: 'Règles',
              data: feelingsData.regles?.map((regle) => (regle === true ? 0 : null)) || [],
              borderColor: 'rgb(0, 0, 0)',
              backgroundColor: 'rgb(0, 0, 0)',
              borderWidth: 2,
              pointRadius: 4,
              pointHoverRadius: 4,
              fill: true,
              hidden: !showRegles
            }
          ],
        };
        }
        setChartData(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };
  
    fetchUserFeelingsAndHistory();
  }, [showFeeling1, showFeeling2, showFeeling3, showFeeling4, showRegles,timeRange]);
  let options
 if(theme==="dark"){ 
    options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          ticks: {
            font: {
              weight: 'bold',
            },
            color: 'white', // Couleur du texte sur l'axe X
          },
          grid: {
            color: 'rgb(253, 253, 253)', // Optionnel : couleur des lignes de la grille
            lineWidth: 0.5,
          },
        },
        y: {
          ticks: {
            font: {
              weight: 'bold',
            },
            color: 'white', // Couleur du texte sur l'axe Y
          },
          grid: {
            color: 'rgb(253, 253, 253)', // Optionnel
            lineWidth: 0.5,
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
            color: 'white', // Couleur du texte de la légende
            boxWidth: 15,
            boxHeight: 5,
            padding: 20,
            usePointStyle: true,
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
              enabled: true,
            },
            mode: 'x',
          },
        },
      },
    };        
  } else {
  options = {
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
          position: 'top',  // Position de la légende
          labels: {
            font: {
              size: 14,
              family: 'Arial',
              weight: 'bold',
            },
            boxWidth: 15,
            boxHeight: 5,
            marginTop: 10,
            marginBottom: 10,
            padding: 20,
            color: '#333',
            usePointStyle: true,
          },
          // Ajout de la bordure autour de la légende entière
          onBeforeInit: (chart) => {
            const legend = chart.legend;
            legend.boxWidth = 30;  // Largeur de la légende (ajustez selon votre besoin)
            legend.labels.padding = 10;  // Espacement entre les labels
            legend.borderColor = '#333';  // Couleur de la bordure
            legend.borderWidth = 2;  // Largeur de la bordure
            legend.borderRadius = 5;  // Rayon des coins
            legend.backgroundColor = 'rgba(255, 255, 255, 0.7)';  // Fond de la légende (transparent ou couleur de fond)
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
              enabled: true,
            },
            mode: 'x',
          },
        },
      },
    };
  }
  
  return (
    <div>
      <div className="container">
        <h6>Historique des émotions</h6>
        <div className="time-filter">
        <button onClick={() => setTimeRange('24heures')}>1 jour</button>
          <button onClick={() => setTimeRange('1semaine')}>1 semaine</button>
          {/* <button onClick={() => setTimeRange('2semaine')}>2 semaines</button> */}
          <button onClick={() => setTimeRange('1mois')}>1 mois</button>
          <button onClick={() => setTimeRange('3mois')}>3 mois</button>
          <button onClick={() => setTimeRange('6mois')}>6 mois</button>
          <button onClick={() => setTimeRange('tout')}>Tout</button>
        </div>
        <div className="chart-container">
          {chartData.labels && <Line data={chartData} options={options} />}
        </div>
        
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
        {/* <div className="button-container">
          <LogoutButton />
        </div> */}
        <p className ="droits">© 2025 myDay. Tous droits réservés.
        Cette application, ainsi que l’ensemble de son contenu, est protégée par les lois en vigueur relatives à la propriété intellectuelle. Les données qu’elle contient sont chiffrées afin d’en garantir la sécurité. </p>
      </div>
      
    </div>
  );
};

export default Historique;

// { "pseudo": { "$eq": "qs"} }
