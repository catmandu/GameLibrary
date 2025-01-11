const controller = require('express').Router();
const {
  GetPublishers,
  CountPublishers,
  CreatePublisher,
  UpdatePublisher,
  DeletePublisher,
} = require('../src/managers/publisher');

const auth = require('../middleware/authentication');

// get all publishers or filter by properties
controller.get('/', auth, async (req, res) => {
  const paging = {
    pageSize: req.header('Page-Size'),
    pageNumber: req.header('Page-Number'),
  };

  const response = await GetPublishers(req.query, paging);

  res.header('Total-Pages', response.totalPages);
  res.json(response.currentPage);
});

// count all publishers in DB
controller.get('/count', auth, async (req, res) => {
  res.json(await CountPublishers());
});

// add new publisher
controller.post('/', auth, async (req, res) => {
  const publisher = req.body;

  res.json(await CreatePublisher(publisher));
});

// update publisher by id
controller.put('/:id', auth, async (req, res) => {
  const publisherId = req.params.id;
  const updatedPublisher = req.body;

  res.json(await UpdatePublisher(publisherId, updatedPublisher));
});

// delete publisher by id
controller.delete('/:id', auth, async (req, res) => {
  const publisherId = req.params.id;

  res.json(await DeletePublisher(publisherId));
});

module.exports = controller;
