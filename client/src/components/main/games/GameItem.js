import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import GameContext from '../../../context/main/game/gameContext';
import PropTypes from 'prop-types';

const GameItem = ({ game, developers, publishers, avaiableGenres, availablePlatforms }) => 
{
  const { SetCurrentGame } = useContext(GameContext);
  const { name, cover, release, developer, publisher, genres, platforms, played, completed } = game;
  const [year, month, day] = release.split('-');
  const months =
  {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    "10": "October",
    "11": "November",
    "12": "December"
  };
  
  return <Link to='/game' style={{color:'inherit'}} onClick={() => { SetCurrentGame(game); }}>
          <div className='card text-center'>
            <div className='text-left'>
              <figcaption className='text-success' >{name}</figcaption>
              <img
              src={cover}
              style={{ width: '150px', height:'230px' }}
              alt="game cover"/>
            </div>        
            <div className='text-left'>
              <label><span className='text-label'>Release: </span>{`${months[month]}/${day}/${year}`}</label>
            </div>
            <div className='text-left'>
              <span><span className='text-label'>Developer: </span>{developers.find(dev => dev._id === developer).name}</span>
            </div>
            <div className='text-left'>
              <span><span className='text-label'>Publisher: </span>{publishers.find(pub => pub._id === publisher).name}</span>
            </div>
            <div className='text-left'>
              <span><span className='text-label'>Genres: </span>{avaiableGenres.filter(gen => genres.includes(gen._id)).map(gen => gen.name).join(', ')}</span>
            </div>
            <div className='text-left'>
              <span><span className='text-label'>Platforms: </span>{availablePlatforms.filter(plat => platforms.includes(plat._id)).map(plat => plat.name).join(', ')}</span>
            </div>
            <div className='text-left'>
              <span><span className='text-label'>Played: <i className={played ? "far fa-smile text-success fa-lg" : "far fa-frown text-danger fa-lg"} /></span></span>
            </div>
            <div className='text-left'>
              <span><span className='text-label'>Completed: <i className={completed ? "far fa-smile text-success fa-lg" : "far fa-frown text-danger fa-lg"} /></span></span>
            </div>
          </div>
        </Link>;
};

GameItem.propTypes = 
{
  game: PropTypes.object.isRequired,
  developers: PropTypes.array.isRequired,
  publishers: PropTypes.array.isRequired,
  avaiableGenres: PropTypes.array.isRequired,
  availablePlatforms : PropTypes.array.isRequired
};

export default GameItem;
