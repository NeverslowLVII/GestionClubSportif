const express = require('express');
const router = express.Router();
const ClubMember = require('../models/ClubMemberModel');

router.get('/members', async (req, res) => {
    try {
        const members = await ClubMember.find();
        res.json(members);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/members/:id', getClubMember, (req, res) => {
    res.json(res.clubMember);
});

router.post('/members', async (req, res) => {
    const member = new ClubMember({
        name: req.body.name,
        age: req.body.age,
        position: req.body.position,
        email: req.body.email,
        isMember: req.body.isMember
    });
    try {
        const newMember = await member.save();
        res.status(201).json(newMember);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/members/:id', getClubMember, async (req, res) => {
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
        const updatedMember = await res.clubMember.save();
        res.json(updatedMember);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/members/:id', getClubMember, async (req, res) => {
    try {
        await res.clubMember.remove();
        res.json({ message: 'Deleted Club Member' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getClubMember(req, res, next) {
    let clubMember;
    try {
        clubMember = await ClubMember.findById(req.params.id);
        if (clubMember == null) {
            return res.status(404).json({ message: 'Cannot find club member' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.clubMember = clubMember;
    next();
}

module.exports = router;
