import React, { useReducer } from 'react';
import axios from 'axios';
import GenreContext from './genreContext';
import GenreReducer from './genreReducer';

import 
{
  SET_LOADING,
  GET_GENRES,
  ADD_GENRE,
  UPDATE_GENRE,
  REMOVE_GENRE,
  FILTER_GENRES,
  SET_CURRENT_GENRE,
  SET_CURRENT_PAGE,
  GENRE_ERROR
} from '../../types';

const GenreState = props => 
{
    const initialState = 
    {
      genres: [],
      filtered: null,
      current: null,
      currentPage: [],
      pageSize: 15,
      pageNumber: 1,
      totalPages: 0
    };
    
    const [state, Dispatch] = useReducer(GenreReducer, initialState);

    // Get Genres
    const GetGenres = async () => 
    {
        SetLoading();
        try 
        {
          const res = await axios.get('/gamelibrary/api/genres');
          Dispatch({ type: GET_GENRES, payload: res.data });
          SetCurrentPage(state.pageNumber);
        }
        catch (err)
        {
          Dispatch({ type: GENRE_ERROR, payload: err.response.msg });
        }
    };

    // Add Genre
    const AddGenre = async newGenre => 
    {
        try 
        {
          const res = await axios.post('/gamelibrary/api/genres', newGenre);
          Dispatch({ type: ADD_GENRE, payload: res.data });
        }
        catch (err)
        {
          Dispatch({ type: GENRE_ERROR, payload: err.response.msg });
        }
    };

    // Updates the current genre
    const UpdateGenre = async genre =>
    {
      try
      {
        const res = await axios.put(`/gamelibrary/api/genres/${genre._id}`, genre);
        Dispatch({ type: UPDATE_GENRE, payload: res.data });
      }
      catch(err)
      {        
        Dispatch({ type: GENRE_ERROR, payload: err.response.msg });
      }
    };

    // Deletes the current genre
    const RemoveGenre = async genre =>
    {
      try
      {
        await axios.delete(`/gamelibrary/api/genres/${genre._id}`);
        
        Dispatch({ type: REMOVE_GENRE, payload: genre._id});
      }
      catch(err)
      {
        Dispatch({ type: GENRE_ERROR, payload: err.response.msg });
      }
    };

    // Filter genres by name
    const FilterGenres = name =>
    {
        SetLoading();
        Dispatch({ type: FILTER_GENRES, payload: name });
    };

    // Set current selected genre
    const SetCurrentGenre = currentGenre => Dispatch({ type: SET_CURRENT_GENRE, payload: currentGenre });

    // Set loading state to true
    const SetLoading = () => Dispatch({ type: SET_LOADING });

    // Sets the currenty selected page of developers 
    const SetCurrentPage = selectedPage => Dispatch({ type: SET_CURRENT_PAGE, payload: selectedPage });

    const providerValue = 
    {
        genres: state.genres,
        current: state.current, 
        filtered: state.filtered,
        loading: state.loading,
        pageNumber: state.pageNumber,
        pageSize: state.pageSize,
        totalPages: state.totalPages,
        currentPage: state.currentPage,
        GetGenres,
        AddGenre,
        UpdateGenre,
        RemoveGenre,
        FilterGenres,
        SetCurrentGenre,
        SetCurrentPage
    };

    return (
        <GenreContext.Provider value={providerValue}>
          {props.children}
        </GenreContext.Provider>
    );
};

export default GenreState;