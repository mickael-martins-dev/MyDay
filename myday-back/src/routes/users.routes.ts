app.get('/user-feelings', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: 'Non autorisé : utilisateur non connecté' });
    }

    try {
        const user = await User.findById(req.session.user._id);
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
        const theme = user.theme;
        const regles = user.responses.map(response => decrypt(response.regle));
        const decryptedFeelings = user.feelings.map(feeling => decrypt(feeling));
        res.json({ feelings: decryptedFeelings, phrasesGratitude: user.responses, regles, theme });
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
        const sortedResponses = user.responses.sort((a, b) => new Date(b.userLocalDate) - new Date(a.userLocalDate));

        const phrases = sortedResponses.map(r => ({
            phraseGratitude: r.phraseGratitude,
            date: r.userLocalDate
        }))

        res.json({ phrases });
    } catch (err) {
        console.error("Erreur lors de la récupération :", err);
        res.status(500).json({ message: 'Erreur serveur lors de la récupération des phrases' });
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

        res.json({ feelings: feelingsDecrypted, pseudo: user.pseudo });
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

        const indexFeelingChanged = index + 1;
        const feelingKey = 'feeling' + indexFeelingChanged;

        console.log("feelingKey : ", feelingKey);

        // Accéder dynamiquement aux propriétés de responses pour effacer l'historique uniquement du feeling modifié
        user.responses.forEach((response) => {
            response[feelingKey] = null;
        });

        if (newFeeling !== null && newFeeling !== undefined && newFeeling !== '') {
            const encryptedFeeling = encrypt(newFeeling);
            user.feelings[index] = encryptedFeeling;
        } else {
            // console.log('user.feeling[index] :',user.feelings[index])
            user.feelings[index] = encrypt("deleted"); // On met bien un vrai null
        }

        // Crypter le nouveau feeling
        const encryptedFeeling = encrypt(newFeeling);

        // Mettre à jour le feeling dans le tableau `feelings` de l'utilisateur
        user.feelings[index] = encryptedFeeling;

        // Sauvegarder l'utilisateur après modification
        await user.save();

        // Répondre avec succès
        res.status(200).json({ message: 'Feeling mis à jour et historique effacé avec succès' });
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
            const decryptedPhraseGratitude = decrypt(response.phraseGratitude);
            const decryptedfeeling1 = decrypt(response.feeling1);
            const decryptedfeeling2 = decrypt(response.feeling2);
            const decryptedfeeling3 = decrypt(response.feeling3);
            const decryptedfeeling4 = decrypt(response.feeling4);
            const decryptedRegle = decrypt(response.regle);

            // Utiliser toObject pour nettoyer les données Mongoose avant de les renvoyer
            const responseObj = response.toObject ? response.toObject() : response;

            return {
                ...responseObj,
                phraseGratitude: decryptedPhraseGratitude,
                feeling1: decryptedfeeling1,
                feeling2: decryptedfeeling2,
                feeling3: decryptedfeeling3,
                feeling4: decryptedfeeling4,
                regle: decryptedRegle,
            };
        });

        // Renvoie les réponses avec la phraseGratitude décryptée
        res.json(decryptedResponses);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur lors de la récupération de l\'historique' });
    }
});
