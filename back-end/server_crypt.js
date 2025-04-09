const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const router = express.Router();
const User = require('./models/user');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bcryptjs = require('bcryptjs');
const MongoStore = require('connect-mongo');
const isAuthenticated = require('./middleware/auth');
const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const iv = crypto.randomBytes(16)
// const secretKey = process.env.SECRET_KEY
// Charger les variables d'environnement

function chiffrerTexte(texte) {
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
  let encrypted = cipher.update(texte, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return {
    iv: iv.toString('hex'),
    contenu: encrypted
  };
}

function dechiffrerTexte(contenuChiffré) {
  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(secretKey),
    Buffer.from(contenuChiffré.iv, 'hex')
  );
  let decrypted = decipher.update(contenuChiffré.contenu, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// Créer une application Express
const app = express();
app.use(cookieParser());
app.use((req, res, next) => {
  // console.log("Cookies : ", req.cookies); // Log des cookies
  next();
});
// Middleware pour parser le corps des requêtes en JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const cors = require('cors');
// app.use(cors());
app.use(cors({
  origin: "https://myday-20rg.onrender.com", // ← le lien exact de ton front !
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.static(path.join(__dirname, 'public')));

app.set('trust proxy', 1)
const sessionMiddleware = session({
  // store: new RedisStore({ host: 'localhost', port: 6379 }),
    secret: process.env.JWT_SECRET || 'default-secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        dbName: 'myDay', // Nom de la base de données
        collectionName: 'production', // Nom de la collection pour les sessions
    }),
    cookie: {
        secure: false, // Mettre true en production avec HTTPS
        // httpOnly: true,
        // sameSite: 'None',
        maxAge: 30*24 * 60 * 60 * 1000, // Durée de vie des cookies (30 jour ici)
    },
});

app.use(sessionMiddleware);

// Ne protège que les API sensibles, pas les routes de React
app.use('/api', (req, res, next) => {
  const isLoggedIn = req.session.user;
  console.log("Session actuelle dans api: ", req.session); // Log de la session active
  if (!isLoggedIn) {
    return res.status(401).json({ message: 'Non autorisé' });
  }
  next();
});

const connectDB = require('./config/db');
connectDB();
// Serveur des fichiers statiques de React
if (process.env.NODE_ENV === 'production') {

    app.get('/', isAuthenticated, (req, res) => {
      console.log("isAuthenticated",isAuthenticated)
      console.log("Session actuelle : ", req.session); // Log de la session active
      res.render('index', { user: req.session.user });
    });
    
    app.get('/Login', async (req, res) => {
        console.log("Session actuelle : ", req.session); // Log de la session active
        res.sendFile(path.join(__dirname, '..', 'front-end', 'build', 'index.html'));
        console.log("dans /Login")
    });

  app.post('/Login', async (req, res) => {
    const { pseudo, password } = req.body;
    console.log("Session actuelle dans Login post: ", req.session); // Log de la session active
    console.log("pseudo : ", pseudo);
    console.log("psw : ", password);

    try {
        const userLogged = await User.findOne({ pseudo });

        // Vérifier si l'utilisateur existe
        if (!userLogged) {
            return res.render('Login', { message: "Login ou mot de passe erroné !" });
        }

        // Vérifier le mot de passe
        const isMatch = await bcryptjs.compare(password, userLogged.password);
        console.log("Valeur de isMatch : ", isMatch); // Log de la session active
        if (!isMatch) {
            return res.render('Login', { message: "Login ou mot de passe erroné !" });
        }

        // Créer la session utilisateur
        req.session.user = {
            _id: userLogged._id,
            username: userLogged.pseudo,
        };
        console.log('req.session.user',req.session.user)
        console.log("Session après connexion :", req.session);

        // Redirection
        if (userLogged.isAdmin === "y") {
            console.log("Utilisateur admin connecté");
            return res.redirect('/admin');
        } else {
            console.log("Utilisateur connecté :", req.session.user.username);
            return res.json({ success: true, redirectUrl: '/' });
            // return res.redirect('/');

        }

    } catch (err) {
        console.error("Erreur lors de la connexion :", err);
        res.status(500).send("Erreur lors de la connexion");
    }
});

    app.get('/api/check-auth', (req, res) => {
      if (req.session.user) {
        // console.log("Session actuelle /api/check-auth: ", req.session.user ); // Log de la session active
        return res.json({ authenticated: true, user: req.session.user });
        //res.json({ authenticated: true, user: req.session.user });
      } else {
        // res.json({ authenticated: false });
        return res.status(401).json({ message: 'Unauthorized' });
      }
    });
  
    app.get('/Register', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'front-end', 'build', 'index.html'));
    console.log("dans /Register")
    });

    app.get('/Historique', (req, res) => {
      if(req.session.user)
        res.sendFile(path.join(__dirname, '..', 'front-end', 'build', 'index.html'));
      console.log("dans /Emotions")
      });

      app.get('/Emotions', (req, res) => {
        if(req.session.user)
          res.sendFile(path.join(__dirname, '..', 'front-end', 'build', 'index.html'));
        console.log("dans /Register")
        });

    app.post('/Register', async (req, res) => {
        // console.log("Requête reçue sur /Register");
        // console.log("Données reçues :", req.body); 
        const { pseudo, password, feelings } = req.body;

      // passwordClean
        const passwordHashed = await bcryptjs.hash(password, 10);
        const newUser = new User({
            pseudo,
            password:passwordHashed,
            feelings,
        });

          // Hacher le mot de passe après validation
           

        try {
            // Enregistrement dans la base de données
            await newUser.save();
            console.log('Utilisateur enregistré avec succès !');
            res.status(201).json({ message: 'Utilisateur créé avec succès' });
        } catch (err) {
            console.error('Erreur lors de l\'enregistrement de l\'utilisateur :', err);
            res.status(500).json({ message: 'Erreur lors de l\'enregistrement' });
        }
    });

    app.post('/', async (req, res) => {
      const { feeling1, feeling2, feeling3, feeling4, phraseGratitude, regle } = req.body;
      const { iv, contenu } = chiffrerTexte(phraseGratitude);
      console.log("req.body",req.body)
      if (!req.session.user) {
          return res.status(401).json({ message: 'Non autorisé : utilisateur non connecté' });
      }
  
      try {
          // Cherche l'utilisateur connecté
          const user = await User.findById(req.session.user._id);
          if (!user) {
              return res.status(404).json({ message: 'Utilisateur non trouvé' });
          }
          const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
          const localDate = new Date().toLocaleString("sv-SE", { timeZone: timezone }); // format ISO-like

          // Convertir en vrai objet Date
          const userLocalDate = new Date(localDate);
          // Ajoute la réponse au tableau `responses`
          user.responses.push({
              feeling1,
              feeling2,
              feeling3,
              feeling4,
              phraseGratitude: { iv, contenu } || "",
              regle,
              timezone: timezone,
              userLocalDate: userLocalDate.toISOString() // envoyer une date valide

          });
  
          // Sauvegarde dans la DB
          await user.save();
  
          // console.log("Réponse enregistrée pour l'utilisateur :", user.pseudo);
  
          res.json({ message: "Réponse enregistrée avec succès" });
      } catch (err) {
          console.error("Erreur lors de l'enregistrement de la réponse :", err);
          res.status(500).json({ message: "Erreur serveur lors de l'enregistrement" });
      }
  });

  app.get('/user-feelings', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: 'Non autorisé : utilisateur non connecté' });
    }

    try {
        const user = await User.findById(req.session.user._id);
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }

        const regles = user.responses.map(response => response.regle);

        res.json({ feelings: user.feelings,phrasesGratitude:user.responses,regles});
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur lors de la récupération des émotions' });
    }
});


app.get('/user-phraseGratitude', async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'Non autorisé : utilisateur non connecté' });
  }

  try {
    const user = await User.findById(req.session.user._id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Tri du tableau responses dans l'ordre décroissant des dates
    const sortedResponses = user.responses.sort((a, b) => new Date(b.userLocalDate) - new Date(a.userLocalDate));

    const phrases = sortedResponses.map(r => ({
      phraseGratitude: r.phraseGratitude,
      date: r.userLocalDate
    }))
    console.log("phrases",phrases)

    res.json({ phrases });
  } catch (err) {
    console.error("Erreur lors de la récupération :", err);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des phrases' });
  }
});

app.post('/logout', (req, res) => {
  if (req.session.user) {
      console.log("// Détruire la session actuelle !!! ")
      req.session.destroy((err) => {
          if (err) {
              return res.status(500).json({ message: 'Erreur lors de la déconnexion' });
          }
          res.clearCookie('connect.sid', { path: '/' });  // Supprime le cookie de session
          res.status(200).json({ message: 'Déconnexion réussie' });  // Confirme la déconnexion
      });
  } else {
      res.status(400).json({ message: 'Aucun utilisateur connecté' });  // Si aucune session n'est active
  }
});

app.get('/user-regles', async (req, res) => {
  if (!req.session.user) {
      return res.status(401).json({ message: 'Non autorisé : utilisateur non connecté' });
  }

  try {
      const user = await User.findById(req.session.user._id);
      if (!user) {
          return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
      console.log("regles .....",user.regles)
      // Récupérer les règles de l'utilisateur
      res.json({ regles: user.regles });
  } catch (err) {
      res.status(500).json({ message: 'Erreur serveur lors de la récupération des règles' });
  }
});

app.get('/user-history', async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'Non autorisé : utilisateur non connecté' });
  }

  try {
    const user = await User.findById(req.session.user._id);
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    res.json(user.responses);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur lors de la récupération de l\'historique' });
  }
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

