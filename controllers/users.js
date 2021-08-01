const controller = require('express').Router();
const { CreateToken } = require('../src/helpers/authHelper');
const { UserValidationRules, Validate } = require('../middleware/validation');
const { IsEmptyObject, IsValidPassword } = require('../src/shared/utils');
const { CreateUser, GetSingleUser } = require('../src/managers/user');

// Register new user
controller.post('/', [UserValidationRules, Validate], async (req, res) => {
  const response = await CreateUser(req.body);
  res.status(response.status).json(response);
});

// Login user
controller.post(
  '/signIn',
  [UserValidationRules, Validate],
  async (req, res) => {
    const { name, password } = req.body;
    const user = await GetSingleUser({ name });

    if (
      !IsEmptyObject(user) &&
      (await IsValidPassword(password, user.password))
    ) {
      return res.status(200).json({
        msg: 'Login successful',
        token: CreateToken({
          user: { name: user.name, _id: user._id }
        })
      });
    }
    return res.status(404).json({ msg: 'Login failed' });
  }
);

module.exports = controller;
