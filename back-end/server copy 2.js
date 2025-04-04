const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const router = express.Router();
const User = require('./models/user');

// Charger les variables d'environnement
dotenv.config();

// Créer une application Express
const app = express();

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());

const cors = require('cors');
app.use(cors());

// // Routes API (exemple)
// app.use('/api', userRoutes);

// // Connexion à la base de données MongoDB
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connecté'))
//     .catch((error) => console.log(error));
// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log('MongoDB connecté');
//     } catch (error) {
//         console.error('Erreur de connexion à MongoDB:', error);
//         process.exit(1);
//     }
// };
const connectDB = require('./config/db');
connectDB();
// Serveur des fichiers statiques de React
if (process.env.NODE_ENV === 'production') {
    // Sert les fichiers statiques du build React
    app.use(express.static(path.join(__dirname, '..', 'front-end', 'build')));
  
    // Toutes les autres routes renvoient le fichier index.html de React
    app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, '..', 'front-end', 'build', 'index.html'));
      console.log("dans /")
    });
    app.get('/Login', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'front-end', 'build', 'index.html'));
        console.log("dans /Login")
    });
    
    app.get('/Register', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'front-end', 'build', 'index.html'));
    console.log("dans /Register")
    });

    app.post('/Register', async (req, res) => {
        console.log("Requête reçue sur /Register");
        console.log("Données reçues :", req.body); 
        const { pseudo, password, feelings } = req.body;
        const newUser = new User({
            pseudo,
            password,
            feelings,
        });
   
        try {
            // Enregistrement dans la base de données
            await newUser.save();
            console.log('Utilisateur enregistré avec succès !');
            
            // Envoie la réponse une seule fois
            res.status(201).json({ message: 'Utilisateur créé avec succès', pseudo: pseudo });
        } catch (err) {
            console.error('Erreur lors de l\'enregistrement de l\'utilisateur :', err);
            res.status(500).json({ message: 'Erreur lors de l\'enregistrement' });
        }
    });
   

    app.post('/', (req, res) => {
        const { feeling1, feeling2, feeling3, feeling4, phraseGratitude, regle } = req.body;
    
        console.log("Données reçues du client :");
        console.log("Joie :", feeling1);
        console.log("Stress :", feeling2);
        console.log("Colère :", feeling3);
        console.log("Légèreté :", feeling4);
        console.log("Phrase de gratitude :", phraseGratitude);
        console.log("Règle acceptée :", regle);
    
        res.json({ message: "Données bien reçues par le serveur" });
    });

  } else {
    // En développement, tu peux laisser React gérer le routage via son serveur de développement
    app.get('/', (req, res) => {
      res.send('API backend en cours d\'exécution');
    });
  }

// Lancer le serveur
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});

module.exports = router;

