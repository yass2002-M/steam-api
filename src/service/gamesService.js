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

const addGame = async (gameToAdd) => {
    return await Games.create(gameToAdd);
}

const updateGame = async (id, modif) => {
    return await Games.findByIdAndUpdate(
        id,
        modif,
        { runValidators: true, new: true }
    );

}


module.exports = { getAllGames, getGame, addGame, updateGame };