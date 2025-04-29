const express = require('express');
const path = require('path');
const router = express.Router();

if (process.env.NODE_ENV === 'production') {
    router.use(express.static(path.join(__dirname, '..', '..', 'front-end', 'build')));

    router.get('/Home', (req, res) => {
        res.sendFile(path.join(__dirname, '..', '..', 'front-end', 'build', 'index.html'));
    });
} else {
    router.get('/', (req, res) => {
        res.send('API backend en cours d\'exécution');
    });
}

module.exports = router;
