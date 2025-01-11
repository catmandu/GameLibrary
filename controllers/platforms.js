const controller = require('express').Router();
const {
  GetPlatforms,
  CountPlatforms,
  CreatePlatform,
  UpdatePlatform,
  DeletePlatform,
} = require('../src/managers/platform');

const auth = require('../middleware/authentication');

// get all platforms or filter by properties
controller.get('/', auth, async (req, res) => {
  const paging = {
    pageSize: req.header('Page-Size'),
    pageNumber: req.header('Page-Number'),
  };

  const response = await GetPlatforms(req.query, paging);

  res.header('Total-Pages', response.totalPages);
  res.json(response.currentPage);
});

// count all platforms in DB
controller.get('/count', auth, async (req, res) => {
  res.json(await CountPlatforms());
});

// add new platform
controller.post('/', auth, async (req, res) => {
  const platform = req.body;

  res.json(await CreatePlatform(platform));
});

// update platform by id
controller.put('/:id', auth, async (req, res) => {
  const platformId = req.params.id;
  const updatedPlatform = req.body;

  res.json(await UpdatePlatform(platformId, updatedPlatform));
});

// delete platform by id
controller.delete('/:id', auth, async (req, res) => {
  const platformId = req.params.id;

  res.json(await DeletePlatform(platformId));
});

module.exports = controller;
