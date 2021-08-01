const { CreateId } = require('../shared/utils');
const repo = require('../repositories/publisher');
const { SortByValue } = require('../helpers/sortingHelper');
const { ApplyPaging } = require('../helpers/pagingHelper');

const GetPublishers = async (query, paging) => {
  const publishers = await repo.GetPublishers(query);

  return ApplyPaging(SortByValue(publishers), paging);
};

const CreatePublisher = async newPublisher =>
  await repo.CreatePublisher({ _id: CreateId(), ...newPublisher });

const UpdatePublisher = async (publisherId, updatedPublisher) => {
  await repo.UpdatePublisher({ _id: publisherId }, updatedPublisher);

  return await _GetSinglePublisher(publisherId);
};

const DeletePublisher = async publisherId =>
  await repo.DeletePublisher({ _id: publisherId });

const CountPublishers = async () => await repo.CountPublishers();

const _GetSinglePublisher = async id =>
  await repo.GetSinglePublisher({ _id: id });

module.exports = {
  GetPublishers,
  CreatePublisher,
  UpdatePublisher,
  DeletePublisher,
  CountPublishers
};
