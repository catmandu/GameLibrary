const { body, validationResult } = require('express-validator');
const { IsEmptyArray } = require('../src/shared/utils');

const UserValidationRules = (() => [
  body('name', 'You must provide a user name').notEmpty(),
  body('password', 'You must provide a password').notEmpty()
])();

const Validate = (req, res, next) => {
  const errors = validationResult(req).array();

  if (!IsEmptyArray(errors)) {
    return res.status(400).json({ errors });
  }
  next();
};

module.exports = {
  UserValidationRules,
  Validate
};
