const mongoose = require('mongoose');

// Définition du schéma pour un membre du club
const clubMemberSchema = new mongoose.Schema({
  // Identifiant unique généré automatiquement
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    auto: true
  },
  // Nom du membre, champ obligatoire
  name: {
    type: String,
    required: true
  },
  // Âge du membre, champ obligatoire
  age: {
    type: Number,
    required: true
  },
  // Poste occupé par le membre dans le club, champ obligatoire
  position: {
    type: String,
    required: true
  },
  // Adresse email du membre, champ non obligatoire
  email: {
    type: String,
    required: false
  },
  // Statut de membre actif ou non, obligatoire, vrai par défaut
  isMember: {
    type: Boolean,
    required: true,
    default: true
  }
});

// Exportation du modèle pour utilisation dans l'application
module.exports = mongoose.model('ClubMember', clubMemberSchema);
