const controller = require('express').Router();
const {
  GetDevelopers,
  CountDevelopers,
  CreateDeveloper,
  UpdateDeveloper,
  DeleteDeveloper
} = require('../src/managers/developer');
const auth = require('../middleware/authentication');

// get all developers or filter by properties
controller.get('/', auth, async (req, res) => {
  const paging = {
    pageSize: req.header('Page-Size'),
    pageNumber: req.header('Page-Number')
  };

  const response = await GetDevelopers(req.query, paging);

  res.header('Total-Pages', response.totalPages);
  res.json(response.currentPage);
});

// count all developers in DB
controller.get('/count', async (req, res) => {
  res.json(await CountDevelopers());
});

// add new developer
controller.post('/', async (req, res) => {
  const developer = req.body;

  res.json(await CreateDeveloper(developer));
});

// update developer by id
controller.put('/:id', async (req, res) => {
  const developerId = req.params.id;
  const updatedDeveloper = req.body;

  res.json(await UpdateDeveloper(developerId, updatedDeveloper));
});

// delete developer by id
controller.delete('/:id', async (req, res) => {
  const developerId = req.params.id;

  res.json(await DeleteDeveloper(developerId));
});

module.exports = controller;
