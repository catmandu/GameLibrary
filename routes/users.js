const express = require('express');
const router = express.Router();
const manager = require('../src/managers/user');

// register new user
router.post('/', async (req, res) =>
{
    const user = req.body;

    res.json(
        await manager.CreateUser(user)
    );
});

module.exports = router;