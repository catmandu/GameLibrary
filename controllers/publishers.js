const controller = require('express').Router();
const {
  GetPublishers,
  CountPublishers,
  CreatePublisher,
  UpdatePublisher,
  DeletePublisher
} = require('../src/managers/publisher');

// get all publishers or filter by properties
controller.get('/', async (req, res) => {
  const paging = {
    pageSize: req.header('Page-Size'),
    pageNumber: req.header('Page-Number')
  };

  const response = await GetPublishers(req.query, paging);

  res.header('Total-Pages', response.totalPages);
  res.json(response.currentPage);
});

// count all publishers in DB
controller.get('/count', async (req, res) => {
  res.json(await CountPublishers());
});

// add new publisher
controller.post('/', async (req, res) => {
  const publisher = req.body;

  res.json(await CreatePublisher(publisher));
});

// update publisher by id
controller.put('/:id', async (req, res) => {
  const publisherId = req.params.id;
  const updatedPublisher = req.body;

  res.json(await UpdatePublisher(publisherId, updatedPublisher));
});

// delete publisher by id
controller.delete('/:id', async (req, res) => {
  const publisherId = req.params.id;

  res.json(await DeletePublisher(publisherId));
});

module.exports = controller;
