const utils = require('../shared/utils');
const genreRepository = require('../repositories/genre');
const sortingHelper = require('../helpers/sortingHelper');
const pagingHelper = require('../helpers/pagingHelper');

const GetGenres = async (query, paging) => 
{
    const genres = await genreRepository.GetGenres(query);

    return pagingHelper.ApplyPaging(
        sortingHelper.SortByValue(genres),
        paging
    );
};

const GetGenreIdFromArray = async idArray => await GetGenres().filter(genre => idArray.includes(genre._id)).map(genre => genre._id);

const CreateGenre = async newGenre => await genreRepository.CreateGenre({ _id: utils.CreateId(), ...newGenre });

const UpdateGenre = async (genreId, updatedGenre) => 
{
    await genreRepository.UpdateGenre({ _id: genreId }, updatedGenre);

    return await _GetSingleGenre(genreId);
};

const DeleteGenre = async genreId => await genreRepository.DeleteGenre({ _id: genreId });

const CountGenres = async () => await genreRepository.CountGenres();

const _GetSingleGenre = async id => await genreRepository.GetSingleGenre({_id: id});

module.exports =
{
    GetGenres,
    GetGenreIdFromArray,
    CreateGenre,
    UpdateGenre,
    DeleteGenre,
    CountGenres
};