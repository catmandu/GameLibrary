import React, { useContext, useEffect } from 'react';
import Search from '../../layout/Search';
import Pagination from '../../layout/Pagination';
import GameItem from './GameItem';
import Spinner from '../../layout/Spinner';
import GameContext from '../../../context/main/game/gameContext';
import DeveloperContext from '../../../context/main/developer/developerContext';
import PublisherContext from '../../../context/main/publisher/publisherContext';
import GenreContext from '../../../context/main/genre/genreContext';
import PlatformContext from '../../../context/main/platform/platformContext';

const Games = () => 
{
  const { games, filtered, 'loading':gamesLoading, pageNumber, totalPages, currentPage, SetCurrentPage, FilterGames, GetGames } = useContext(GameContext);
  const { developers, 'loading':developersLoading, GetDevelopers } = useContext(DeveloperContext);
  const { publishers, 'loading':publishersLoading, GetPublishers } = useContext(PublisherContext);
  const { 'genres':avaiableGenres, 'loading':genresLoading, GetGenres } = useContext(GenreContext);
  const { 'platforms':availablePlatforms, 'loading':platformsLoading, GetPlatforms } = useContext(PlatformContext);
  const loading = gamesLoading || developersLoading || publishersLoading || genresLoading || platformsLoading;

  useEffect(() =>
  {
    games.length === 0 && GetGames();    
    developers.length === 0 && GetDevelopers();
    publishers.length === 0 && GetPublishers();
    avaiableGenres.length === 0 && GetGenres();
    availablePlatforms.length === 0 && GetPlatforms();
    //eslint-disable-next-line
  }, []);

  let content;
  const currentGames = filtered || currentPage;

  if (loading)
  {
    content = <Spinner/>;
  }
  else if(currentGames !== null && currentGames.length === 0)
  {
    content = <h4>No games found</h4>;
  }
  else
  {
    const gameContainerStyle = 
    {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gridGap: '1rem'
    };

    content = (<div style={gameContainerStyle}>
                {
                  currentGames.map(game =>
                  
                    <GameItem key={game._id} 
                        game={game} 
                        developers={developers} 
                        publishers={publishers} 
                        avaiableGenres={avaiableGenres} 
                        availablePlatforms={availablePlatforms}/>
                  )
                }
              </div>);
  }

  return <>
            <Search Filter={FilterGames}/>
            <Pagination listName='games' totalItems={games.length} pageNumber={pageNumber} totalPages={totalPages} SetCurrentPage={SetCurrentPage} />
            {content}
          </>;
};

export default Games;
