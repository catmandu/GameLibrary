const utils = require('../shared/utils');
const platformRepository = require('../repositories/platform');
const sortingHelper = require('../helpers/sortingHelper');
const pagingHelper = require('../helpers/pagingHelper');

const GetPlatforms = async (query, paging) => 
{
    const platforms = await platformRepository.GetPlatforms(query);
    
    return pagingHelper.ApplyPaging(
        sortingHelper.SortByValue(platforms),
        paging
    );
};

const GetPlatformIdFromArray = async idArray => await GetPlatforms().filter(platform => idArray.includes(platform._id)).map(platform => platform._id);

const CreatePlatform = async newPlatform => await platformRepository.CreatePlatform({ _id: utils.CreateId(), ...newPlatform });

const UpdatePlatform = async (platformId, updatedPlatform) => 
{
    await platformRepository.UpdatePlatform({ _id: platformId }, updatedPlatform);

    return await _GetSinglePlatform(platformId);
}

const DeletePlatform = async platformId => await platformRepository.DeletePlatform({ _id: platformId });

const CountPlatforms = async () => await platformRepository.CountPlatforms();

const _GetSinglePlatform = async id => await platformRepository.GetSinglePlatform({ _id: id});

module.exports =
{
    GetPlatforms,
    GetPlatformIdFromArray,
    CreatePlatform,
    UpdatePlatform,
    DeletePlatform,
    CountPlatforms
};