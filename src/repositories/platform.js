// read DB model
const db = require('../../models/Platform');

const GetPlatforms = async query => await db.find(query);

const GetSinglePlatform = async query => await db.findOne(query);

const CreatePlatform = async newPlatform => {
  const platform = new db(newPlatform);

  platform.save(newPlatform);

  return platform;
};

const UpdatePlatform = async (platformId, updatedPlatform) =>
  await db.findOneAndUpdate(platformId, updatedPlatform);

const DeletePlatform = async platformId => await db.deleteOne(platformId);

const CountPlatforms = async () => await db.estimatedDocumentCount();

module.exports = {
  GetPlatforms,
  GetSinglePlatform,
  CreatePlatform,
  UpdatePlatform,
  DeletePlatform,
  CountPlatforms
};
