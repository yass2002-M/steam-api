const express = require('express');
const router = express.Router();
const gamesService = require('../service/gamesService');
router.get('/', async (req, res) => {
    try {
        const games = await gamesService.getAllGames();
        if (!games) res.status(403).json({message : 'Aucun jeux trouvé'});
        res.status(200).json({games: games , count : games.length});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try{
        const { id } = req.params;
        if(!id) throw new Error("il manque l'id");
        const game = await gamesService.getGame(id);
        if(!game) res.status(404).json({message : 'le jeux est introuvable'});
        res.status(200).json({game});
    }catch (err) {
        res.status(403).json({ message: err.message });
    }
});


module.exports = router;