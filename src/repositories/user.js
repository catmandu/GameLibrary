const db = require('../../models/User');

const GetUsers = async query => await db.find(query);

const GetSingleUser = async query => await db.findOne(query);

const CreateUser = async newUser => {
  const user = new db(newUser);

  await user.save();

  return user;
};

const UpdateUser = async (userId, updatedUser) =>
  await db.findOneAndUpdate(userId, updatedUser);

const DeleteUser = async userId => await db.deleteOne(userId);

const CountUsers = async () => await db.estimatedDocumentCount();

module.exports = {
  GetUsers,
  GetSingleUser,
  CreateUser,
  UpdateUser,
  DeleteUser,
  CountUsers
};
