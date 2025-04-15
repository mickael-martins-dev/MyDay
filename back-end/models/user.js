const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  feeling1: String,
  feeling2: String,
  feeling3: String,
  feeling4: String,
  phraseGratitude: String,
  // phraseGratitude: {
  //   iv: String,
  //   contenu: String
  // },A
  // regle: Boolean,
  regle: String,
  date: { type: Date, default: Date.now }, // UTC serveur
  userLocalDate: { type: Date },           // date locale exacte
  timezone: { type: String }, 
  
  
});

// Définition du schéma de l'utilisateur
const userSchema = new mongoose.Schema({
    pseudo: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mail: { type: String, required: true},
    mailHash: { type: String, unique: true, index: true },
    feelings: [{ type: String }], // Tableau de chaînes de caractères pour les feelings
    responses : [responseSchema],
    theme: { type: String, default: 'colorful' },
    phraseRegister :{ type: String, required: true },
});

// Création du modèle User à partir du schéma
const User = mongoose.model('User', userSchema);

module.exports = User;