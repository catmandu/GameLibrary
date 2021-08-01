import React, { useReducer } from 'react';
import axios from 'axios';
import GameContext from './gameContext';
import GameReducer from './gameReducer';

import 
{
  GET_GAMES,
  ADD_GAME,
  GAME_ERROR,
  SET_CURRENT_GAME,
  SET_CURRENT_PAGE,
  SET_LOADING,
  FILTER_GAMES,
  CLEAR_GAMES,
  UPDATE_GAME,
  REMOVE_GAME
} from '../../types';

const GameState = props => 
{    
    const [state, Dispatch] = useReducer(GameReducer, {
      games: [],
      current: null,
      filtered: null,
      pageSize: 9,
      pageNumber: 1,
      totalPages: 0,
      currentPage: []
    });

    // Get Contacts
    const GetGames = async () => 
    {
        SetLoading();
        try 
        {
          const res = await axios.get('/gamelibrary/api/games');
          Dispatch({ type: GET_GAMES, payload: res.data });
          SetCurrentPage(state.pageNumber);
        } 
        catch (err)
        {
          Dispatch({ type: GAME_ERROR, payload: err.response.msg });
        }
    };

    // Add Game
    const AddGame = async newGame =>
    {
      try
      {
        const res = await axios.post('/gamelibrary/api/games', newGame);
        Dispatch({ type: ADD_GAME, payload: res.data});
      }
      catch(err)
      {
        Dispatch({ type: GAME_ERROR, payload: err.response.msg });
      }
    };

    // Update current game
    const UpdateGame = async game =>
    {
      try
      {
        const res = await axios.put(`/gamelibrary/api/games/${game._id}`, game);
        Dispatch({ type: UPDATE_GAME, payload: res.data });
      }
      catch(err)
      {
        Dispatch({ type: GAME_ERROR, payload: err.response.msg });
      }
    };

    // Deletes current game
    const RemoveGame = async game =>
    {
      try
      {
        await axios.delete(`/gamelibrary/api/games/${game._id}`);
        Dispatch({ type: REMOVE_GAME, payload: game._id });
      }
      catch(err)
      {
        Dispatch({ type: GAME_ERROR, payload: err.response.msg });
      }
    };

    // Filter games
    const FilterGames = gameData => 
    {
      SetLoading();
      Dispatch({ type: FILTER_GAMES, payload: gameData });
    };
    
    // Setting current game
    const SetCurrentGame = selectedGame => Dispatch({type:SET_CURRENT_GAME, payload:selectedGame});
    
    // Clear games from state
    const ClearGames = () => Dispatch({ type: CLEAR_GAMES });
    
    // Set loading
    const SetLoading = () => Dispatch({ type: SET_LOADING });

    const SetCurrentPage = selectedPage => Dispatch({ type: SET_CURRENT_PAGE, payload: selectedPage });

    const providerValue = 
    {
        games: state.games,
        filtered: state.filtered,
        current: state.current,
        loading: state.loading,
        pageSize: state.pageSize,
        pageNumber: state.pageNumber,
        totalPages: state.totalPages,
        currentPage: state.currentPage,
        GetGames,
        AddGame,
        UpdateGame,
        RemoveGame,
        ClearGames,
        FilterGames,
        SetCurrentGame,
        SetCurrentPage
    };

    return (
        <GameContext.Provider value={providerValue}>
          {props.children}
        </GameContext.Provider>
    );
};

export default GameState;