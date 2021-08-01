const utils = require('../shared/utils');
const auth = require('../helpers/authHelper');
const repo = require('../repositories/user');

const CreateUser = async ({name, password}) =>
{    
    let response = {
        status: 400,
        msg:'User already exists',
        token: '',
        user: {}
    };

    try 
    {
        let user = await GetSingleUser({name});

        if (!utils.IsEmptyObject(user))
        {
          return response;
        }

        user.password = await utils.CreateHashedPassword(password);
        
        user = await repo.CreateUser({_id: utils.CreateId(), name, password: user.password});
  
        response.token = auth.CreateToken({
            user: {
              _id: user._id
            }
        });
        response.status = 201;
        response.msg = 'success';
        response.user = user;

        return response;
    }
    catch (err)
    {
        console.error(err.message);
        response.status = 500;
        response.msg = 'Server error';

        return response;
    }
};

const GetSingleUser = async query => await repo.GetSingleUser(query) || {};

module.exports = {
    CreateUser,
    GetSingleUser
};