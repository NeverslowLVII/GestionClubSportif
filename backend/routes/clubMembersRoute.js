const express = require('express');
const router = express.Router();
// Importation du modèle ClubMember pour interagir avec la base de données
const ClubMember = require('../models/ClubMemberModel');

// Route pour obtenir tous les membres du club
router.get('/members', async (req, res) => {
    try {
        // Récupération de tous les membres en utilisant le modèle ClubMember
        const members = await ClubMember.find();
        // Envoi des membres récupérés en réponse
        res.json(members);
    } catch (err) {
        // Gestion des erreurs et envoi d'une réponse avec le statut 500
        res.status(500).json({ message: err.message });
    }
});

// Route pour obtenir un membre spécifique par son ID
router.get('/members/:id', getClubMember, (req, res) => {
    // Envoi du membre récupéré par le middleware getClubMember
    res.json(res.clubMember);
});

// Route pour créer un nouveau membre
router.post('/members', async (req, res) => {
    // Création d'une instance du modèle ClubMember avec les données reçues
    const member = new ClubMember({
        _id: req.body._id,
        name: req.body.name,
        age: req.body.age,
        position: req.body.position,
        email: req.body.email,
        isMember: req.body.isMember
    });
    try {
        // Sauvegarde du nouveau membre dans la base de données
        const newMember = await member.save();
        // Envoi du nouveau membre créé avec un statut 201
        res.status(201).json(newMember);
    } catch (err) {
        // Gestion des erreurs et envoi d'une réponse avec le statut 400
        res.status(400).json({ message: err.message });
    }
});

// Route pour mettre à jour un membre existant par son ID
router.put('/members/:id', getClubMember, async (req, res) => {
    // Mise à jour des champs du membre si ils sont présents dans la requête
    if (req.body.name != null) {
        res.clubMember.name = req.body.name;
    }
    if (req.body.age != null) {
        res.clubMember.age = req.body.age;
    }
    if (req.body.position != null) {
        res.clubMember.position = req.body.position;
    }
    if (req.body.email != null) {
        res.clubMember.email = req.body.email;
    }
    if (req.body.isMember != null) {
        res.clubMember.isMember = req.body.isMember;
    }
    try {
        // Sauvegarde des modifications du membre dans la base de données
        const updatedMember = await res.clubMember.save();
        // Envoi du membre mis à jour en réponse
        res.json(updatedMember);
    } catch (err) {
        // Gestion des erreurs et envoi d'une réponse avec le statut 400
        res.status(400).json({ message: err.message });
    }
});

// Route pour supprimer un membre par son ID
router.delete('/members/:id', getClubMember, async (req, res) => {
    try {
        // Suppression du membre de la base de données
        await ClubMember.deleteOne({ _id: res.clubMember._id });
        // Envoi d'une confirmation de suppression
        res.json({ message: 'Deleted Club Member' });
    } catch (err) {
        // Gestion des erreurs et envoi d'une réponse avec le statut 500
        res.status(500).json({ message: err.message });
    }
});

// Middleware pour récupérer un membre par son ID et le passer aux routes suivantes
async function getClubMember(req, res, next) {
    let clubMember;
    try {
        // Tentative de récupération du membre par son ID
        clubMember = await ClubMember.findById(req.params.id);
        if (clubMember == null) {
            // Si le membre n'est pas trouvé, envoi d'une réponse avec le statut 404
            return res.status(404).json({ message: 'Cannot find club member' });
        }
    } catch (err) {
        // Gestion des erreurs et envoi d'une réponse avec le statut 500
        return res.status(500).json({ message: err.message });
    }
    // Passage du membre récupéré aux routes suivantes
    res.clubMember = clubMember;
    next();
}

// Exportation du routeur pour utilisation dans l'application
module.exports = router;
