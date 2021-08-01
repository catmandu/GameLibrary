const express = require('express');
const router = express.Router();
const gameManager = require('../src/managers/game');

// get all games, filter by properties or get single game by its id
router.get('/', async (req, res) => 
{
    const paging = 
    {
        pageSize: req.header('Page-Size'),
        pageNumber: req.header('Page-Number')
    };

    const response = await gameManager.GetGamesForUi(req.query, paging);

    res.header('Total-Pages', response.totalPages);
    res.json(response.currentPage);
});

// count all games in DB
router.get('/count', async (req, res) =>
{
    res.json(
        await gameManager.CountGames()
    );
});

// add new game
router.post('/', async (req, res) =>
{
    const game = req.body;

    res.json(
        await gameManager.CreateGame(game)
    );
});

// update game by id
router.put('/:id', async (req, res) => 
{
    const gameId = req.params.id;
    const updatedGame = req.body;

    res.json(
        await gameManager.UpdateGame(gameId, updatedGame)
    );
});

// delete game by id
router.delete('/:id', async (req, res) =>
{
    const gameId = req.params.id;

    res.json(
        await gameManager.DeleteGame(gameId)
    );
});

module.exports = router;