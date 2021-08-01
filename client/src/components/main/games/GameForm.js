import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Title from '../../layout/Title';
import CheckBoxList from '../../layout/CheckBoxList';
import DropDownList from '../../layout/DropDownList';
import RadioButton from '../../layout/RadioButton';
import TextBox from '../../layout/TextBox';
import SubmitButton from '../../layout/SubmitButton';
import GameContext from '../../../context/main/game/gameContext';
import DeveloperContext from '../../../context/main/developer/developerContext';
import PublisherContext from '../../../context/main/publisher/publisherContext';
import GenreContext from '../../../context/main/genre/genreContext';
import PlatformContext from '../../../context/main/platform/platformContext';
import AlertContext from '../../../context/alert/alertContext';
import ConfirmContext from '../../../context/confirm/confirmContext';

const GameForm = () =>
{
    const { AddGame, UpdateGame, RemoveGame, GetGames, current, games } = useContext(GameContext);
    const { developers, GetDevelopers } = useContext(DeveloperContext);
    const { publishers, GetPublishers } = useContext(PublisherContext);
    const { 'genres': availableGenres, GetGenres } = useContext(GenreContext);
    const { 'platforms': availablePlatforms, GetPlatforms } = useContext(PlatformContext);
    const { SetAlert } = useContext(AlertContext);
    const { SetConfirm, RemoveConfirm } = useContext(ConfirmContext);
    const [game, SetGame] = useState(current || {
      name:'',
      release:'',
      developer:'',
      publisher:'',
      cover:'',
      genres:[],
      platforms:[],
      completed:false,
      played:false
    });
    const [deleteSelected, SetOperation] = useState(false);
    const history = useHistory();
    const { name, release, developer, publisher, genres, platforms, cover, completed, played } = game;

    useEffect(() => 
    { 
      window.scrollTo(0, 0);
      developers.length === 0 && GetDevelopers();
      publishers.length === 0 && GetPublishers();
      availableGenres.length === 0 && GetGenres();
      availablePlatforms.length === 0 && GetPlatforms();
      // eslint-disable-next-line
    }, []);

    const OnSubmit = async e =>
    {
        e.preventDefault();
        const fieldsIncomplete = name === '' || release === '' || developer === '' || publisher === '' || cover === '';
        const genresUnassigned = genres.length === 0;
        const platformsUnassigned = platforms.length === 0;
        const errorMessage = fieldsIncomplete ? 'Fill all the fields' : 
                            genresUnassigned ? 'You must select at least one genre' :
                            platformsUnassigned && 'You must select at least one platform';

        if(fieldsIncomplete || genresUnassigned || platformsUnassigned)
        {
          SetAlert(errorMessage, 'danger');
        }
        else
        {
          const actionTitle = current === null ? 'Add' : deleteSelected ? 'Delete' : 'Update';
          SetConfirm(`${actionTitle} game`, `Are you sure you want to ${actionTitle.toLocaleLowerCase()} the current game?`, async () =>
          {
            const Action = current === null ? AddGame : deleteSelected ? RemoveGame : UpdateGame;
            await Action(game);
            games.length === 0 && await GetGames();
            RemoveConfirm();
            SetAlert(`${actionTitle} successful`, 'success');
            history.push('/availableGames');
          });
        }
    };

    return (
        <form onSubmit={OnSubmit}>
          <Title title='Game' currentState={current} deleteState={deleteSelected} SetOperation={SetOperation}/>
          
          <TextBox title='Name' placeholder="Game's name" name='name' state={game} deleteState={deleteSelected} SetState={SetGame}/>
          <TextBox type='date' title='Release date' name='release' deleteState={deleteSelected} state={game} SetState={SetGame}/>
          
          <DropDownList title='Developer' name='developer' list={developers} state={game} SetState={SetGame} deleteState={deleteSelected}/>
          <DropDownList title='Publisher' name='publisher' list={publishers} state={game} SetState={SetGame} deleteState={deleteSelected}/>
          
          <TextBox title='Art Cover' placeholder="url to game's art cover" name='cover' deleteState={deleteSelected} state={game} SetState={SetGame}/>
          {game.cover !== undefined && (<div className='container'><img alt='game cover' src={game.cover} style={{width:'150px'}}/></div>)}
          
          <CheckBoxList title='Genres' name='genres' list={availableGenres} state={game} SetState={SetGame} deleteState={deleteSelected}/>
          <CheckBoxList title='Platforms' name='platforms' list={availablePlatforms} state={game} SetState={SetGame} deleteState={deleteSelected}/>
          
          <RadioButton title='Played' name='played' value={played} state={game} SetState={SetGame} deleteState={deleteSelected}/>
          <RadioButton title='Completed' name='completed' value={completed} state={game} SetState={SetGame} deleteState={deleteSelected}/>
          
          <SubmitButton title='Game' currentState={current} deleteState={deleteSelected} />
        </form>);
};

export default GameForm;