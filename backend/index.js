// Importation des modules nécessaires
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
// Importation des routes pour les membres du club
const clubMemberRoutes = require('./routes/clubMembersRoute');

// Initialisation de l'application Express
const app = express();

// Configuration du middleware pour analyser le JSON et servir les fichiers statiques
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// URI de connexion à MongoDB Atlas et MongoDB local
const atlasURI = 'mongodb+srv://[username]:[password]@cluster0.z0rv5ak.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const localURI = 'mongodb://localhost:27017/ClubSportif';

// Tentative de connexion à MongoDB Atlas, sinon connexion à la base de données locale
mongoose.connect(atlasURI)
  .then((result) => console.log('Connecté à MongoDB Atlas'))
  .catch((err) => {
    console.error('Échec de la connexion à MongoDB Atlas, tentative de connexion à la base de données locale...');
    mongoose.connect(localURI)
      .then((result) => console.log('Connecté à MongoDB local'))
      .catch((err) => console.error('Échec de la connexion à MongoDB local', err));
  });

// Configuration du routeur pour les API des membres du club
app.use('/api', clubMemberRoutes);

// Démarrage du serveur sur le port 3000
app.listen(3000, () => {
  console.log('Serveur en cours d\'exécution sur le port 3000');
});