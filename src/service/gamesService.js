const Games = require('../model/gamesModel.js');

const getAllGames = async () => {
    try {
        const games = await Games.find();
        if (!games) throw new Error (' Aucun jeux trouvé ');
        return games;
    }catch(err){
        return err.message;
    }
}

const getGame = async (id) => {
    try {
        const game = await Games.findById(id)
        if (!game) throw new Error (' le jeux est introuvable ');
        return game;
    }catch(err){
        return err.message;
    }
}


module.exports = {getAllGames , getGame};