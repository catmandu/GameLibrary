import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import GenreContext from '../../../context/main/genre/genreContext';
import PropTypes from 'prop-types';

const GenreItem = ({ genre }) => 
{
  const { SetCurrentGenre } = useContext(GenreContext);
  const { name } = genre;
  
  return (
    <Link to='/genre' style={{color:'inherit'}} onClick={() => { SetCurrentGenre(genre); }}>
      <div className='card text-center'>
        <span className='text-label'>{name}</span>
      </div>
    </Link>    
  );
};

GenreItem.propTypes = 
{
  genre: PropTypes.object.isRequired
};

export default GenreItem;
