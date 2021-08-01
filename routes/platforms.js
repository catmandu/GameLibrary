const express = require('express');
const router = express.Router();
const platformManager = require('../src/managers/platform');

// get all platforms or filter by properties
router.get('/', async (req, res) =>
{
    const paging = 
    {
        pageSize: req.header('Page-Size'),
        pageNumber: req.header('Page-Number')
    };

    const response = await platformManager.GetPlatforms(req.query, paging);
    
    res.header('Total-Pages', response.totalPages);
    res.json(response.currentPage);
});

// count all platforms in DB
router.get('/count', async (req, res) =>
{
    res.json(
        await platformManager.CountPlatforms()
    );
});

// add new platform
router.post('/', async (req, res) =>
{
    const platform = req.body;
    
    res.json(
        await platformManager.CreatePlatform(platform)
    );
});

// update platform by id
router.put('/:id', async (req, res) => 
{
    const platformId = req.params.id;
    const updatedPlatform = req.body;

    res.json(
        await platformManager.UpdatePlatform(platformId, updatedPlatform)
    );
});

// delete platform by id
router.delete('/:id', async (req, res) =>
{
    const platformId = req.params.id;

    res.json(
        await platformManager.DeletePlatform(platformId)
    );
});

module.exports = router;