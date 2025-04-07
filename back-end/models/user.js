const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  feeling1: String,
  feeling2: String,
  feeling3: String,
  feeling4: String,
  phraseGratitude: String,
  regle: Boolean,
  date: { type: Date, default: Date.now }, // UTC serveur
  userLocalDate: { type: Date },           // date locale exacte
  timezone: { type: String }               // ex: Europe/Paris
});

// Définition du schéma de l'utilisateur
const userSchema = new mongoose.Schema({
    pseudo: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    feelings: [{ type: String }], // Tableau de chaînes de caractères pour les feelings
    responses : [responseSchema]
});

// Création du modèle User à partir du schéma
const User = mongoose.model('User', userSchema);

module.exports = User;