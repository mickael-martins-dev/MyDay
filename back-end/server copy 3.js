const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const router = express.Router();
const User = require('./models/user');
// const connectDB = require('./config/db'); // Si tu utilises MongoDB
// const userRoutes = require('./routes/userRoutes');
// const authMiddleware = require('./middlewares/authMiddleware');

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

    // app.post('/Register', (req, res) => {
    //     console.log("Requête reçue sur /Register");
    //     console.log("Données reçues :", req.body); // 📌 Doit afficher les données envoyées
        
    //     const userPseudo = req.body.pseudo;
    //     const userPassword = req.body.password;
    //     const userFeeling = req.body.feelings;
    //     console.log('Pseudo reçu :', userPseudo);
    //     console.log('Password reçu :', userPassword);
    //     console.log('Felling 1 reçu :', userFeeling[0]);
    //     console.log('Felling 4 reçu :', userFeeling[3]);
    
    //     res.json({ message: "Données reçues", pseudo: userPseudo });
        
    // })
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
            res.status(201).json({ message: 'Utilisateur créé avec succès' });
        } catch (err) {
            console.error('Erreur lors de l\'enregistrement de l\'utilisateur :', err);
            res.status(500).json({ message: 'Erreur lors de l\'enregistrement' });
        }
        const userPseudo = req.body.pseudo;
        const userPassword = req.body.password || "non fourni";  // 🛠️ Évite l'erreur
        const feelings2 = req.body.feelings || []; // 🛠️ Évite undefined
    
        console.log('Pseudo reçu :', userPseudo);
        console.log('Password reçu :', userPassword);
    
        if (feelings2.length > 0) {
            console.log('Felling 1 reçu :', feelings2[0]);  
            console.log('Felling 4 reçu :', feelings2[feelings.length - 1]);  
        } else {
            console.log('Aucun feeling reçu');
        }
    
        // res.json({ message: "Données reçues", pseudo: userPseudo });
    });
    // router.post('/register', async (req, res) => {
    //     const { pseudo, password, feelings } = req.body;
    
    //     // Création d'un nouvel utilisateur
    //     const newUser = new User({
    //         pseudo,
    //         password,
    //         feelings,
    //     });
    
    //     try {
    //         // Enregistrement dans la base de données
    //         await newUser.save();
    //         console.log('Utilisateur enregistré avec succès !');
    //         res.status(201).json({ message: 'Utilisateur créé avec succès' });
    //     } catch (err) {
    //         console.error('Erreur lors de l\'enregistrement de l\'utilisateur :', err);
    //         res.status(500).json({ message: 'Erreur lors de l\'enregistrement' });
    //     }
    // });

    // app.post('/',(req,res)=>{
    //     console.log("donnée recu de la journée !!")
    //     res.json({ message: "Données reçues" });
    // })

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

// Routes
// app.use('/api', routes);

// // Middleware d'authentification (exemple)
// app.use(authMiddleware);

// Lancer le serveur
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});

module.exports = router;

