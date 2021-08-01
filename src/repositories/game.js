// read DB model
const db = require('../../models/Game');

const GetGames = async query => await db.find(query);

const GetSingleGame = async query => await db.findOne(query);

const CreateGame = async newGame => {
  const game = new db(newGame);

  await game.save(newGame);

  return game;
};

const UpdateGame = async (gameId, updatedGame) =>
  await db.findOneAndUpdate(gameId, updatedGame);

const DeleteGame = async gameId => await db.deleteOne(gameId);

const CountGames = async () => await db.estimatedDocumentCount();

module.exports = {
  GetGames,
  GetSingleGame,
  CreateGame,
  UpdateGame,
  DeleteGame,
  CountGames
};
