const express = require('express');
const router = express.Router();
const publisherManager = require('../src/managers/publisher');

// get all publishers or filter by properties
router.get('/', async (req, res) =>
{
    const paging = 
    {
        pageSize: req.header('Page-Size'),
        pageNumber: req.header('Page-Number')
    };

    const response = await publisherManager.GetPublishers(req.query, paging);

    res.header('Total-Pages', response.totalPages);
    res.json(response.currentPage);
});

// count all publishers in DB
router.get('/count', async (req, res) =>
{
    res.json(
        await publisherManager.CountPublishers()
    );
});

// add new publisher
router.post('/', async (req, res) =>
{
    const publisher = req.body;
    
    res.json(
        await publisherManager.CreatePublisher(publisher)
    );
});

// update publisher by id
router.put('/:id', async (req, res) => 
{
    const publisherId = req.params.id;
    const updatedPublisher = req.body;

    res.json(
        await publisherManager.UpdatePublisher(publisherId, updatedPublisher)
    );
});

// delete publisher by id
router.delete('/:id', async (req, res) =>
{
    const publisherId = req.params.id;

    res.json(
        await publisherManager.DeletePublisher(publisherId)
    );
});

module.exports = router;