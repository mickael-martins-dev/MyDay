app.post('/api/Login', async (req, res) => {
    const { pseudo, password } = req.body;
    try {
        const userLogged = await User.findOne({ pseudo });

        if (!userLogged) {
            return res.status(400).json({ errorMessage: "Login ou mot de passe erroné !" });
        }

        const isMatch = await bcryptjs.compare(password, userLogged.password);
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
            return res.json({ success: true, redirectUrl: '/' });

        }

    } catch (err) {
        console.error("Erreur lors de la connexion :", err);
        res.status(500).send("Erreur lors de la connexion");
    }
});

app.get('/api/check-auth', async (req, res) => {
    if (req.session.user) {
        const pseudo = req.session.user.username
        try {
            const user = await User.findOne({ pseudo: pseudo })
            return res.json({ authenticated: true, user: req.session.user, theme: user.theme });
        } catch (err) {
            console.error("Erreur lors de la connexion :", err);
            res.status(500).send("Erreur lors de la connexion");
        }
    } else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
});