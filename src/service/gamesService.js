const Games = require('../model/gamesModel.js');

const getAllGames = async (page) => {
    const limit = 10;
    const games = await Games.find()
        .limit(limit)
        .sort({ _id: 1 })
        .skip(page * limit);
    return games;
}

const getGame = async (id) => {
    const game = await Games.findById(id)
    return game;
}


module.exports = { getAllGames, getGame };