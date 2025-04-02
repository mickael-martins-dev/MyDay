// /back-end/routes/frontEndRoutes.js
const express = require('express');
const path = require('path');
const router = express.Router();

// Si on est en production, on sert les fichiers statiques générés par React
if (process.env.NODE_ENV === 'production') {
    // Sert les fichiers statiques du build React
    router.use(express.static(path.join(__dirname, '..', '..', 'front-end', 'build')));

    // Route pour renvoyer le fichier index.html
    router.get('/Home', (req, res) => {
        res.sendFile(path.join(__dirname, '..', '..', 'front-end', 'build', 'index.html'));
    });
} else {
    // Si on est en développement, laisse React gérer le routage
    router.get('/', (req, res) => {
        res.send('API backend en cours d\'exécution');
    });
}

module.exports = router;
