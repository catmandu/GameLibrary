const utils = require('../shared/utils');
const gameRepository = require('../repositories/game');
const dataShapeHelper = require('../helpers/dataShapeHelper');
const sortingHelper = require('../helpers/sortingHelper');
const pagingHelper = require('../helpers/pagingHelper');

const GetGamesForUi = async (query, paging) =>
{
    const { shapeData, id, ...dbQuery } = query;

    if(!utils.IsEmptyString(id))
    {
        return {
            currentPage: await _GetSingleGameForUi(query),
            totalPages: 1
        };
    }

    const games = [];
    const dbGames = await _GetGames(dbQuery);

    if(!utils.IsEmptyArray(dbGames))
    {
        dbGames.forEach(dbGame =>
        {
            games.push(
                dataShapeHelper.ShapeSingleObject(shapeData, dbGame)
            );
        });
    }

    return pagingHelper.ApplyPaging(
        sortingHelper.SortByValue(games),
        paging
    );
};

const CreateGame = async newGame =>
{
    const newInfo = await gameRepository.CreateGame({ _id: utils.CreateId(), ...newGame });

    return newInfo;
};

const UpdateGame = async (gameId, updatedGame) =>
{
    await gameRepository.UpdateGame({ _id: gameId }, updatedGame);
    
    return await _GetSingleGame(gameId);
};

const DeleteGame = async gameId => await gameRepository.DeleteGame({ _id: gameId });

const CountGames = async () => await gameRepository.CountGames();

const _GetGames = async query => await gameRepository.GetGames(query);

const _GetSingleGame = async gameId => await gameRepository.GetSingleGame({_id: gameId});

const _GetSingleGameForUi = async query =>
{
    const { shapeData, id } = query;
    const dbGame = await _GetSingleGame(id);

    if(!utils.IsEmptyObject(dbGame))
    {
        return dataShapeHelper.ShapeSingleObject(shapeData, dbGame);
    }

    return dbGame;
};

module.exports = 
{
    GetGamesForUi,
    CreateGame,
    UpdateGame,
    DeleteGame,
    CountGames
};