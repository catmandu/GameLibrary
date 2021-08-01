const express = require('express');
const router = express.Router();
const auth = require('../src/helpers/authHelper');
const utils = require('../src/shared/utils');
const repo = require('../src/managers/user');

// generate a new token for a given user
router.post('/', async (req, res) =>
{
    const {_id, name, password} = req.body;
    const user = await repo.GetSingleUser({ _id });
    res.json({
         token: auth.CreateToken({ user: { _id } }),
         validPasswor: await utils.IsValidPassword(password, user.password),
         password: user.password
    });
});

router.get('/:token', (req, res) =>
{
    res.json(auth.VerifyToken(req.params.token));
});

module.exports = router;