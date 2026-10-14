const express = require('express');
const router = express.Router();
const gamesService = require('../service/gamesService');
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const games = await gamesService.getAllGames(page);
        if (!games) return res.status(403).json({ message: 'Aucun jeux trouvé' });
        res.status(200).json({ page: page, count: games.length, games: games });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) throw new Error("il manque l'id");
        const game = await gamesService.getGame(id);
        if (!game) res.status(404).json({ message: 'le jeux est introuvable' });
        res.status(200).json({ game });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const gameToAdd = req.body;
        if (!gameToAdd || Object.keys(gameToAdd).length === 0) {
            return res.status(400).json({ message: 'verifiez ce que vous avez ecrit' });
        }
        const game = await gamesService.addGame(gameToAdd);
        res.status(201).json(game);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const modif = req.body;
        if (!id) return res.status(400).json({ message: " il manque l'id " });
        const game = await gamesService.updateGame(id, modif);
        res.status(204).json({message : 'votre jeux a été mis a jour' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;