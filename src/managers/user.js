const {
  IsEmptyObject,
  CreateHashedPassword,
  CreateId
} = require('../shared/utils');
const { CreateToken } = require('../helpers/authHelper');
const repo = require('../repositories/user');

const CreateUser = async ({ name, password }) => {
  let response = {
    status: 400,
    msg: 'User already exists',
    token: '',
    user: {}
  };

  try {
    let user = await GetSingleUser({ name });

    if (!IsEmptyObject(user)) {
      return response;
    }

    user.password = await CreateHashedPassword(password);

    user = await repo.CreateUser({
      _id: CreateId(),
      name,
      password: user.password
    });

    response.token = CreateToken({
      user: {
        _id: user._id,
        name: user.name
      }
    });
    response.status = 201;
    response.msg = 'success';
    response.user = user;

    return response;
  } catch (err) {
    response.status = 500;
    response.msg = 'Server error';

    return response;
  }
};

const GetSingleUser = async query => (await repo.GetSingleUser(query)) || {};

module.exports = {
  CreateUser,
  GetSingleUser
};
