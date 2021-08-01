const utils = require('../shared/utils');
const developerRepository = require('../repositories/developer');
const sortingHelper = require('../helpers/sortingHelper');
const pagingHelper = require('../helpers/pagingHelper');

const GetDevelopers = async (query, paging) => 
{
  const developers = await developerRepository.GetDevelopers(query);

  return pagingHelper.ApplyPaging(
    sortingHelper.SortByValue(developers),
    paging
  );
};

const CreateDeveloper = async newDeveloper => await developerRepository.CreateDeveloper({ _id: utils.CreateId(), ...newDeveloper });

const UpdateDeveloper = async (developerId, updatedDeveloper) => 
{  
  await developerRepository.UpdateDeveloper({ _id: developerId }, updatedDeveloper);
  
  return await _GetSingleDeveloper(developerId);
};

const DeleteDeveloper = async developerId => await developerRepository.DeleteDeveloper({ _id: developerId });

const CountDevelopers = async () => await developerRepository.CountDevelopers();

const _GetSingleDeveloper = async id => await developerRepository.GetSingleDeveloper({_id: id});

module.exports =
{
    GetDevelopers,
    CreateDeveloper,
    UpdateDeveloper,
    DeleteDeveloper,
    CountDevelopers
};