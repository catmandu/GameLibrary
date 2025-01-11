const controller = require('express').Router();
const { CreateToken, VerifyToken } = require('../src/helpers/authHelper');
const { UserValidationRules, Validate } = require('../middleware/validation');
const { IsEmptyObject, IsValidPassword } = require('../src/shared/utils');
const { CreateUser, GetSingleUser } = require('../src/managers/user');
const { auth } = require('../middleware/authentication');

// Register new user
controller.post('/', [UserValidationRules, Validate], async (req, res) => {
  const response = await CreateUser(req.body);
  res.status(response.status).json(response);
});

// Login user
controller.post('/login', [UserValidationRules, Validate], async (req, res) => {
  const { name, password } = req.body;
  const user = await GetSingleUser({ name });

  if (
    !IsEmptyObject(user) &&
    (await IsValidPassword(password, user.password))
  ) {
    const result = {
      id: user._id,
      name: user.name,
    };

    res.cookie('token', CreateToken(result, '7d'), {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 604800000,
      secure: process.env.NODE_ENV !== 'development',
    });

    return res.status(200).json(result);
  }
  return res.status(404).send();
});

controller.get('/refresh-token', async (req, res) => {
  const token = req.cookies['token'];

  if (!token) {
    return res.status(404).send();
  }

  return res.status(200).json(VerifyToken(token));
});

controller.post('/logout', async (req, res) => {
  res.clearCookie('token', {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV !== 'development',
  });

  return res.status(200).send();
});

module.exports = controller;
