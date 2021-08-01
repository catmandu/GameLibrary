const utils = require('../shared/utils');
const publisherRepository = require('../repositories/publisher');
const sortingHelper = require('../helpers/sortingHelper');
const pagingHelper = require('../helpers/pagingHelper');

const GetPublishers = async (query, paging) =>
{
    const publishers = await publisherRepository.GetPublishers(query);

    return pagingHelper.ApplyPaging(
        sortingHelper.SortByValue(publishers),
        paging
    );
};    

const CreatePublisher = async newPublisher => await publisherRepository.CreatePublisher({ _id: utils.CreateId(), ...newPublisher });

const UpdatePublisher = async (publisherId, updatedPublisher) => 
{
    await publisherRepository.UpdatePublisher({ _id: publisherId }, updatedPublisher);

    return await _GetSinglePublisher(publisherId);
};

const DeletePublisher = async publisherId => await publisherRepository.DeletePublisher({ _id: publisherId });

const CountPublishers = async () => await publisherRepository.CountPublishers();

const _GetSinglePublisher = async id => await publisherRepository.GetSinglePublisher({_id: id});

module.exports =
{
    GetPublishers,
    CreatePublisher,
    UpdatePublisher,
    DeletePublisher,
    CountPublishers
};