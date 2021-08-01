const { CreateId } = require('../shared/utils');
const repo = require('../repositories/genre');
const { SortByValue } = require('../helpers/sortingHelper');
const { ApplyPaging } = require('../helpers/pagingHelper');

const GetGenres = async (query, paging) => {
  const genres = await repo.GetGenres(query);

  return ApplyPaging(SortByValue(genres), paging);
};

const GetGenreIdFromArray = async idArray =>
  await GetGenres()
    .filter(genre => idArray.includes(genre._id))
    .map(genre => genre._id);

const CreateGenre = async newGenre =>
  await repo.CreateGenre({ _id: CreateId(), ...newGenre });

const UpdateGenre = async (genreId, updatedGenre) => {
  await repo.UpdateGenre({ _id: genreId }, updatedGenre);

  return await _GetSingleGenre(genreId);
};

const DeleteGenre = async genreId => await repo.DeleteGenre({ _id: genreId });

const CountGenres = async () => await repo.CountGenres();

const _GetSingleGenre = async id => await repo.GetSingleGenre({ _id: id });

module.exports = {
  GetGenres,
  GetGenreIdFromArray,
  CreateGenre,
  UpdateGenre,
  DeleteGenre,
  CountGenres
};
