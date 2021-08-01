const { sign, verify } = require('jsonwebtoken');
const { jwtSecret } = require('config');

const CreateToken = payload => {
  return sign(payload, jwtSecret, {
    expiresIn: '1h'
  });
};

const VerifyToken = token => verify(token, jwtSecret);

module.exports = {
  CreateToken,
  VerifyToken
};
