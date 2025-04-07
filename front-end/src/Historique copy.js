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

        if (dataFeelings && dataFeelings.feelings) {
          setFeelings(dataFeelings.feelings);  // Met à jour l'état avec les émotions
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des émotions :", error);
      }
    };

    fetchUserFeelings();

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
        const data = {
          labels,
          datasets: [
            {
              label: feelings[0],
              data: historyData.map(entry => entry.feeling1),
              borderColor: 'rgba(75, 192, 192, 1)',
              fill: false,
            },
            {
              label: feelings[1],
              data: historyData.map(entry => entry.feeling2),
              borderColor: 'rgba(153, 102, 255, 1)',
              fill: false,
            },
            {
              label: feelings[2],
              data: historyData.map(entry => entry.feeling3),
              borderColor: 'rgba(255, 99, 132, 1)',
              fill: false,
            },
            {
              label: feelings[3],
              data: historyData.map(entry => entry.feeling4),
              borderColor: 'rgba(255, 206, 86, 1)',
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
      </div>
    </div>
  );
};

export default Historique;
