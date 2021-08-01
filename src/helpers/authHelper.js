const jwt = require('jsonwebtoken');
const config = require('config');

const CreateToken = (payload) =>{
    return jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: '1h'
        }          
      );
};

const VerifyToken = token => jwt.verify(token, config.get('jwtSecret'));

module.exports = {
    CreateToken,
    VerifyToken
};