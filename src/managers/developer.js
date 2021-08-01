const { CreateId } = require('../shared/utils');
const repo = require('../repositories/developer');
const { SortByValue } = require('../helpers/sortingHelper');
const { ApplyPaging } = require('../helpers/pagingHelper');

const GetDevelopers = async (query, paging) => {
  const developers = await repo.GetDevelopers(query);

  return ApplyPaging(SortByValue(developers), paging);
};

const CreateDeveloper = async newDeveloper =>
  await repo.CreateDeveloper({ _id: CreateId(), ...newDeveloper });

const UpdateDeveloper = async (developerId, updatedDeveloper) => {
  await repo.UpdateDeveloper({ _id: developerId }, updatedDeveloper);

  return await _GetSingleDeveloper(developerId);
};

const DeleteDeveloper = async developerId =>
  await repo.DeleteDeveloper({ _id: developerId });

const CountDevelopers = async () => await repo.CountDevelopers();

const _GetSingleDeveloper = async id =>
  await repo.GetSingleDeveloper({ _id: id });

module.exports = {
  GetDevelopers,
  CreateDeveloper,
  UpdateDeveloper,
  DeleteDeveloper,
  CountDevelopers
};
