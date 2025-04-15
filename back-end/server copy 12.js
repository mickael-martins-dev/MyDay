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
const {encrypt, decrypt} = require('./utils/cryptOutils')

// Charger les variables d'environnement

dotenv.config();

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
  // console.log("Session actuelle dans api: ", req.session); // Log de la session active
  if (!isLoggedIn) {
    return res.status(401).json({ message: 'Non autorisé' });
  }
  next();
});

const connectDB = require('./config/db');
connectDB();
// Serveur des fichiers statiques de React
if (process.env.NODE_ENV === 'production') {
    // Sert les fichiers statiques du build React
    app.use(express.static(path.join(__dirname, '..', 'front-end', 'build')));

    app.get('/', isAuthenticated, (req, res) => {
      // console.log("isAuthenticated",isAuthenticated)
      // console.log("Session actuelle : ", req.session); // Log de la session active
      const theme = req.session.user?.theme || 'colorful';
      res.render('index', { user: req.session.user, theme });
    });
    
    app.get('/Login', async (req, res) => {
      // console.log("Session actuelle : ", req.session); // Log de la session active
        res.sendFile(path.join(__dirname, '..', 'front-end', 'build', 'index.html'));
        // console.log("dans /Login")
    });

  app.post('/Login', async (req, res) => {
    const { pseudo, password } = req.body;
    try {
        const userLogged = await User.findOne({ pseudo });

        // Vérifier si l'utilisateur existe
        if (!userLogged) {
          return res.status(400).json({ errorMessage: "Login ou mot de passe erroné !" });
        }

        // Vérifier le mot de passe
        const isMatch = await bcryptjs.compare(password, userLogged.password);
        // console.log("Valeur de isMatch : ", isMatch); // Log de la session active
        if (!isMatch) {
            return res.status(400).json({ errorMessage: "Login ou mot de passe erroné !" });
        }

        // Créer la session utilisateur
        req.session.user = {
            _id: userLogged._id,
            username: userLogged.pseudo,
           
        };

        // Redirection
        if (userLogged.isAdmin === "y") {
            console.log("Utilisateur admin connecté");
            return res.redirect('/admin');
        } else {
            // console.log("Utilisateur connecté :", req.session.user.username);
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
      });

    app.get('/Identifiants', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'front-end', 'build', 'index.html'));
      });  
      app.get('/IdentifiantsMdp', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'front-end', 'build', 'index.html'));
      }); 
      app.get('/IdentifiantsPseudo', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'front-end', 'build', 'index.html'));
      }); 
      app.post("/IdentifiantsPseudo", async (req,res)=>{
        console.log("dans recuperation du login")
        const {mail,password}=req.body
        // const mailEncrypted=mail ? encrypt(mail):""
        console.log("mail decrytpé :",mail)
        // console.log("mail crytpé :",mailEncrypted)
        console.log("password : ",password)
        try {
          const user = await User.findOne({mail});
          console.log("user : ",user)
          const isMatch = await bcryptjs.compare(password, user.password);
          if(isMatch){
            console.log("yeahhhhhhh :",user.pseudo)
            res.json({ success: true, pseudo: user.pseudo });
          }
        }
        catch (err) {
          console.error(err);
          res.json({ success: false });
      }
       
      })
      app.get('/Settings', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'front-end', 'build', 'index.html'));
      }); 
      
      app.post('/getTheme', async (req, res) => {
        const { pseudo} = req.body;
        console.log("pseudo : ")
    
        try {
            const user = await User.findOne({ pseudo });
            if (!user) return res.json({ success: false });
    
            res.json({ success: true, theme: user.theme || 'colorful' });
        } catch (err) {
            console.error(err);
            res.json({ success: false });
        }
    });

    app.post('/setTheme', async (req, res) => {
      const { pseudo, theme } = req.body;
      console.log("pseudo theme : ", pseudo, theme)
      try {
        
        await User.updateOne(
              { pseudo },
              { $set: { theme } }
          );
          res.json({ success: true });
      } catch (err) {
          console.error(err);
          res.json({ success: false });
      }
  });
    

    app.post('/Register', async (req, res) => {
        // console.log("Requête reçue sur /Register");
        console.log("Données reçues :", req.body); 
        const { pseudo, password, feelings,mail,phraseRegister } = req.body;
        const theme= req.body.theme || "colorful";
        const feeling1Encrypted = []
        feeling1Encrypted[0] = feelings[0] ? encrypt(feelings[0]) : "";
        feeling1Encrypted[1] = feelings[1] ? encrypt(feelings[1]) : "";
        feeling1Encrypted[2] = feelings[2] ? encrypt(feelings[2]) : "";
        feeling1Encrypted[3] = feelings[3] ? encrypt(feelings[3]) : "";
        // mailEncrypted = mail ? encrypt(mail) : "";
        phraseRegisterEncrypted= phraseRegister ? encrypt(phraseRegister) :"";
      // passwordCleanp
        const passwordHashed = await bcryptjs.hash(password, 10);
        const newUser = new User({
            pseudo,
            password:passwordHashed,
            feelings:feeling1Encrypted,
            // mail:mailEncrypted,
            mail:mail,
            theme:theme || 'colorful',
            phraseRegister:phraseRegisterEncrypted
        });
        console.log("new user :",newUser)
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
      const feeling1Encrypted = feeling1 ? encrypt(feeling1) : "";
      const feeling2Encrypted = feeling2 ? encrypt(feeling2) : "";
      const feeling3Encrypted = feeling3 ? encrypt(feeling3) : "";
      const feeling4Encrypted = feeling4 ? encrypt(feeling4) : "";
      const regleEncrypted = regle ? encrypt(regle) : "";

      console.log("regleEncrypted ------------------>>>>>",regleEncrypted)

      if (!req.session.user) {
          return res.status(401).json({ message: 'Non autorisé : utilisateur non connecté' });
      }
      const phraseGratitudeEncrypted = phraseGratitude ? encrypt(phraseGratitude) : "";
  
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
          console.log("je suis avant insert MongoDB")
          user.responses.push({
              feeling1:feeling1Encrypted,
              // feeling1,
              feeling2:feeling2Encrypted,
              feeling3:feeling3Encrypted,
              feeling4:feeling4Encrypted,
              phraseGratitude: phraseGratitudeEncrypted || "",
              regle:regleEncrypted,
              // regle,
              timezone: timezone,
              userLocalDate: userLocalDate.toISOString() // envoyer une date valide

          });

          console.log("user.responses",user.responses)
  
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

        const regles = user.responses.map(response => decrypt(response.regle));
        const decryptedFeelings = user.feelings.map(feeling => decrypt(feeling));
        res.json({ feelings: decryptedFeelings,phrasesGratitude:user.responses,regles});
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
    // console.log("user dans user phrase gratitude : ",user)
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    
    // Tri du tableau responses dans l'ordre décroissant des dates
    const sortedResponses = user.responses.sort((a, b) => new Date(b.userLocalDate) - new Date(a.userLocalDate));

    const phrases = sortedResponses.map(r => ({
      phraseGratitude: r.phraseGratitude,
      date: r.userLocalDate
    }))
    // console.log("phrases",phrases)

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

      const decryptedResponses = user.responses.map(response => {

        // console.log("response.regle :",response.regle)
        const decryptedRegle = decrypt(response.regle);
        
        // console.log("regle decrypté 5555555555555555: ", decryptedRegle);
        // console.log("decryptedfeeling1: ", decryptedfeeling1);
  
        // Utiliser toObject pour nettoyer les données Mongoose avant de les renvoyer
        const responseObj = response.toObject ? response.toObject() : response;
  
        return {
          ...responseObj, // garde toutes les autres valeurs intactes
          regle:decryptedRegle
  
        };
      });

      res.json(decryptedResponses);

  } catch (err) {
      res.status(500).json({ message: 'Erreur serveur lors de la récupération des règles' });
  }
});

app.get('/getFeelings', async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ message: 'non autorisé' });
    }

    const user = await User.findById(req.session.user._id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    const feelingsDecrypted = user.feelings.map(f => f ? decrypt(f) : "");

    res.json({ feelings: feelingsDecrypted });
  } catch (error) {
    console.error("Erreur dans /getFeelings :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

app.post('/updateFeeling', async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ message: 'Non autorisé' });
    }

    const { index, newFeeling } = req.body;
    const user = await User.findById(req.session.user._id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    const encryptedFeeling = encrypt(newFeeling);
    user.feelings[index] = encryptedFeeling;
    await user.save();

    res.status(200).json({ message: 'Feeling mis à jour avec succès' });
  } catch (err) {
    console.error("Erreur dans /updateFeeling :", err);
    res.status(500).json({ message: "Erreur serveur" });
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

    const decryptedResponses = user.responses.map(response => {
      const decryptedPhraseGratitude = decrypt(response.phraseGratitude); // déchiffrer la phraseGratitude
      const decryptedfeeling1 = decrypt(response.feeling1);
      const decryptedfeeling2 = decrypt(response.feeling2);
      const decryptedfeeling3 = decrypt(response.feeling3);
      const decryptedfeeling4 = decrypt(response.feeling4);
      // console.log("response.regle :",response.regle)
      const decryptedRegle = decrypt(response.regle);
      
      // console.log("regle decrypté 5555555555555555: ", decryptedRegle);
      // console.log("decryptedfeeling1: ", decryptedfeeling1);

      // Utiliser toObject pour nettoyer les données Mongoose avant de les renvoyer
      const responseObj = response.toObject ? response.toObject() : response;

      return {
        ...responseObj, // garde toutes les autres valeurs intactes
        phraseGratitude: decryptedPhraseGratitude,
        feeling1: decryptedfeeling1 ,
        feeling2: decryptedfeeling2 ,
        feeling3: decryptedfeeling3 ,
        feeling4: decryptedfeeling4,
        regle:decryptedRegle,
        // regle:response.regle

      };
    });
    
    // console.log("decryptedResponses ",decryptedResponses)
    // Renvoie les réponses avec la phraseGratitude décryptée
    res.json(decryptedResponses);
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

// module.exports = router;

