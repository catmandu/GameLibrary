const { sign, verify } = require('jsonwebtoken');
const { jwtSecret } = require('config');

const CreateToken = (payload, expiration) => {
  return sign(payload, jwtSecret, {
    expiresIn:
      expiration !== null && expiration !== undefined ? expiration : '15m',
  });
};

const VerifyToken = (token) => verify(token, jwtSecret);

module.exports = {
  CreateToken,
  VerifyToken,
};
