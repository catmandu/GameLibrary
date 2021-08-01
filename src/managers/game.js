const {
  IsEmptyString,
  IsEmptyArray,
  CreateId,
  IsEmptyObject
} = require('../shared/utils');
const repo = require('../repositories/game');
const { ShapeSingleObject } = require('../helpers/dataShapeHelper');
const { SortByValue } = require('../helpers/sortingHelper');
const { ApplyPaging } = require('../helpers/pagingHelper');

const GetGamesForUi = async (query, paging) => {
  const { shapeData, id, ...dbQuery } = query;

  if (!IsEmptyString(id)) {
    return {
      currentPage: await _GetSingleGameForUi(query),
      totalPages: 1
    };
  }

  const games = [];
  const dbGames = await _GetGames(dbQuery);

  if (!IsEmptyArray(dbGames)) {
    dbGames.forEach(dbGame => {
      games.push(ShapeSingleObject(shapeData, dbGame));
    });
  }

  return ApplyPaging(SortByValue(games), paging);
};

const CreateGame = async newGame => {
  const newInfo = await repo.CreateGame({ _id: CreateId(), ...newGame });

  return newInfo;
};

const UpdateGame = async (gameId, updatedGame) => {
  await repo.UpdateGame({ _id: gameId }, updatedGame);

  return await _GetSingleGame(gameId);
};

const DeleteGame = async gameId => await repo.DeleteGame({ _id: gameId });

const CountGames = async () => await repo.CountGames();

const _GetGames = async query => await repo.GetGames(query);

const _GetSingleGame = async gameId =>
  await repo.GetSingleGame({ _id: gameId });

const _GetSingleGameForUi = async query => {
  const { shapeData, id } = query;
  const dbGame = await _GetSingleGame(id);

  if (!IsEmptyObject(dbGame)) {
    return ShapeSingleObject(shapeData, dbGame);
  }

  return dbGame;
};

module.exports = {
  GetGamesForUi,
  CreateGame,
  UpdateGame,
  DeleteGame,
  CountGames
};
