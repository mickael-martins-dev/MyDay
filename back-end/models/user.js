const mongoose = require('mongoose');

// Définition du schéma de l'utilisateur
const userSchema = new mongoose.Schema({
    pseudo: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    feelings: [{ type: String }], // Tableau de chaînes de caractères pour les feelings
});

// Création du modèle User à partir du schéma
const User = mongoose.model('User', userSchema);

module.exports = User;