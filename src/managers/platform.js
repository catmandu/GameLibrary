const { CreateId } = require('../shared/utils');
const repo = require('../repositories/platform');
const { SortByValue } = require('../helpers/sortingHelper');
const { ApplyPaging } = require('../helpers/pagingHelper');

const GetPlatforms = async (query, paging) => {
  const platforms = await repo.GetPlatforms(query);

  return ApplyPaging(SortByValue(platforms), paging);
};

const GetPlatformIdFromArray = async idArray =>
  await GetPlatforms()
    .filter(platform => idArray.includes(platform._id))
    .map(platform => platform._id);

const CreatePlatform = async newPlatform =>
  await repo.CreatePlatform({ _id: CreateId(), ...newPlatform });

const UpdatePlatform = async (platformId, updatedPlatform) => {
  await repo.UpdatePlatform({ _id: platformId }, updatedPlatform);

  return await _GetSinglePlatform(platformId);
};

const DeletePlatform = async platformId =>
  await repo.DeletePlatform({ _id: platformId });

const CountPlatforms = async () => await repo.CountPlatforms();

const _GetSinglePlatform = async id =>
  await repo.GetSinglePlatform({ _id: id });

module.exports = {
  GetPlatforms,
  GetPlatformIdFromArray,
  CreatePlatform,
  UpdatePlatform,
  DeletePlatform,
  CountPlatforms
};
