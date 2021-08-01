import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import GameContext from '../../context/main/game/gameContext';
import DeveloperContext from '../../context/main/developer/developerContext';
import PublisherContext from '../../context/main/publisher/publisherContext';
import GenreContext from '../../context/main/genre/genreContext';
import PlatformContext from '../../context/main/platform/platformContext';

const Navbar = ({ icon, title }) => 
{
  const { SetCurrentGame } = useContext(GameContext);
  const { SetCurrentDeveloper } = useContext(DeveloperContext);
  const { SetCurrentPublisher } = useContext(PublisherContext);
  const { SetCurrentGenre } = useContext(GenreContext);
  const { SetCurrentPlatform } = useContext(PlatformContext);

  return (<nav className='navbar bg-primary'>
              <Link to='/'>
                <h1>
                  <i className={icon} /> {title}
                </h1>
              </Link>
              <ul>
                <li className='dropdown'>
                  <button>Games</button>
                  <div className='dropdown-content'>
                    <Link to='/availableGames'>Available Games</Link>
                    <Link to='/game' onClick={() => SetCurrentGame(null)}>Add New Game</Link>
                  </div>
                </li>
                <li className='dropdown'>
                  <button>Developers</button>
                  <div className='dropdown-content'>                    
                    <Link to='/availableDevelopers'>Available Developers</Link>
                    <Link to='/developer' onClick={()=> SetCurrentDeveloper(null)}>Add New Developer</Link>
                  </div>
                </li>
                <li className='dropdown'>
                  <button>Publishers</button>
                  <div className='dropdown-content'>
                    <Link to='/availablePublishers'>Available Publishers</Link>                    
                    <Link to='/publisher' onClick={() => SetCurrentPublisher(null)}>Add New Publisher</Link>
                  </div>
                </li>       
                <li className='dropdown'>
                  <button>Genres</button>
                  <div className='dropdown-content'>
                    <Link to='/availableGenres'>Available Genres</Link>
                    <Link to='/genre' onClick={() => SetCurrentGenre(null)}>Add New Genre</Link>
                  </div>
                </li>           
                <li className='dropdown'>
                  <button>Platforms</button>
                  <div className='dropdown-content'>
                    <Link to='/availablePlatforms'>Available Platforms</Link>
                    <Link to='/platform' onClick={() => SetCurrentPlatform(null)}>Add New Platform</Link>
                  </div>
                </li>
                <li>
                  <Link to='/about'>About</Link>
                </li>
              </ul>
            </nav>);
};

Navbar.defaultProps = 
{
  title: 'Game Library',
  icon: 'fas fa-gamepad'
};

Navbar.propTypes = 
{
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

export default Navbar;
