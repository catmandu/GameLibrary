// read DB model
const db = require('../../models/Genre');

const GetGenres = async query => await db.find(query);

const GetSingleGenre = async genreId => await db.findOne(genreId);

const CreateGenre = async newGenre => {
  const genre = new db(newGenre);

  await genre.save(newGenre);

  return genre;
};

const UpdateGenre = async (genreId, updatedGenre) =>
  await db.findOneAndUpdate(genreId, updatedGenre);

const DeleteGenre = async genreId => await db.deleteOne(genreId);

const CountGenres = async () => await db.estimatedDocumentCount();

module.exports = {
  GetGenres,
  GetSingleGenre,
  CreateGenre,
  UpdateGenre,
  DeleteGenre,
  CountGenres
};
