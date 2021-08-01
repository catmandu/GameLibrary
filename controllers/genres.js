const controller = require('express').Router();
const {
  GetGenres,
  CountGenres,
  CreateGenre,
  UpdateGenre,
  DeleteGenre
} = require('../src/managers/genre');

// get all genres or filter by properties
controller.get('/', async (req, res) => {
  const paging = {
    pageSize: req.header('Page-Size'),
    pageNumber: req.header('Page-Number')
  };

  const response = await GetGenres(req.query, paging);

  res.header('Total-Pages', response.totalPages);
  res.json(response.currentPage);
});

// count all genres in DB
controller.get('/count', async (req, res) => {
  res.json(await CountGenres());
});

// add new genre
controller.post('/', async (req, res) => {
  const genre = req.body;

  res.json(await CreateGenre(genre));
});

// update genre by id
controller.put('/:id', async (req, res) => {
  const genreId = req.params.id;
  const updatedGenre = req.body;

  res.json(await UpdateGenre(genreId, updatedGenre));
});

// delete genre by id
controller.delete('/:id', async (req, res) => {
  const genreId = req.params.id;

  res.json(await DeleteGenre(genreId));
});

module.exports = controller;
