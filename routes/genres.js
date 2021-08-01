const express = require('express');
const router = express.Router();
const genreManager = require('../src/managers/genre');

// get all genres or filter by properties
router.get('/', async (req, res) =>
{
    const paging = 
    {
        pageSize: req.header('Page-Size'),
        pageNumber: req.header('Page-Number')
    };
    
    const response = await genreManager.GetGenres(req.query, paging);
    
    res.header('Total-Pages', response.totalPages);
    res.json(response.currentPage);
});

// count all genres in DB
router.get('/count', async (req, res) =>
{
    res.json(
        await genreManager.CountGenres()
    );
});

// add new genre
router.post('/', async (req, res) =>
{
    const genre = req.body;

    res.json(
        await genreManager.CreateGenre(genre)
    );
});
 
// update genre by id
router.put('/:id', async (req, res) => 
{
    const genreId = req.params.id;
    const updatedGenre = req.body;

    res.json(
        await genreManager.UpdateGenre(genreId, updatedGenre)
    );
});

// delete genre by id
router.delete('/:id', async (req, res) =>
{
    const genreId = req.params.id;
    
    res.json(
        await genreManager.DeleteGenre(genreId)
    );
});

module.exports = router;