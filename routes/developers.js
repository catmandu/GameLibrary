const express = require('express');
const router = express.Router();
const manager = require('../src/managers/developer');
const auth = require('../middleware/authentication');

// get all developers or filter by properties
router.get('/', auth, async (req, res) =>
{
    const paging = 
    {
        pageSize: req.header('Page-Size'),
        pageNumber: req.header('Page-Number')
    };

    const response = await manager.GetDevelopers(req.query, paging);
    
    res.header('Total-Pages', response.totalPages);
    res.json(response.currentPage);
});

// count all developers in DB
router.get('/count', async (req, res) =>
{
    res.json(
        await manager.CountDevelopers()
    );
});

// add new developer
router.post('/', async (req, res) =>
{
    const developer = req.body;

    res.json(
        await manager.CreateDeveloper(developer)
    );
});

// update developer by id
router.put('/:id', async (req, res) => 
{
    const developerId = req.params.id;
    const updatedDeveloper = req.body;

    res.json(
       await manager.UpdateDeveloper(developerId, updatedDeveloper)
    );
});

// delete developer by id
router.delete('/:id', async (req, res) =>
{
    const developerId = req.params.id;

    res.json(
        await manager.DeleteDeveloper(developerId)
    );
});

module.exports = router;