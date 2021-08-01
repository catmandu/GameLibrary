const controller = require('express').Router();
const {
  GetGamesForUi,
  CountGames,
  CreateGame,
  UpdateGame,
  DeleteGame
} = require('../src/managers/game');

// get all games, filter by properties or get single game by its id
controller.get('/', async (req, res) => {
  const paging = {
    pageSize: req.header('Page-Size'),
    pageNumber: req.header('Page-Number')
  };

  const response = await GetGamesForUi(req.query, paging);

  res.header('Total-Pages', response.totalPages);
  res.json(response.currentPage);
});

// count all games in DB
controller.get('/count', async (req, res) => {
  res.json(await CountGames());
});

// add new game
controller.post('/', async (req, res) => {
  const game = req.body;

  res.json(await CreateGame(game));
});

// update game by id
controller.put('/:id', async (req, res) => {
  const gameId = req.params.id;
  const updatedGame = req.body;

  res.json(await UpdateGame(gameId, updatedGame));
});

// delete game by id
controller.delete('/:id', async (req, res) => {
  const gameId = req.params.id;

  res.json(await DeleteGame(gameId));
});

module.exports = controller;
