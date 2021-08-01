import React, { useReducer } from 'react';
import axios from 'axios';
import DeveloperContext from './developerContext';
import DeveloperReducer from './developerReducer';

import 
{
  SET_LOADING,
  SET_CURRENT_PAGE,
  GET_DEVELOPERS,
  DEVELOPER_ERROR,
  ADD_DEVELOPER,
  UPDATE_DEVELOPER,
  REMOVE_DEVELOPER,
  SET_CURRENT_DEVELOPER,
  FILTER_DEVELOPERS
} from '../../types';

const DeveloperState = props => 
{
    const initialState = 
    {
      current: null,
      filtered: null,
      developers: [],
      pageNumber: 1,
      pageSize: 15,
      totalPages: 0,
      currentPage: [],
      config: {}
    };
    
    const [state, Dispatch] = useReducer(DeveloperReducer, initialState);

    // Get Developers
    const GetDevelopers = async () => 
    {
        SetLoading();
        try 
        {
          const res = await axios.get(`/gamelibrary/api/developers`);
          Dispatch({ type: GET_DEVELOPERS, payload: res.data });
          SetCurrentPage(state.pageNumber);
        }
        catch (err)
        {
          Dispatch({ type: DEVELOPER_ERROR, payload: err });
        }
    };

    // Add new developer
    const AddDeveloper = async newDeveloper =>
    {
        try
        {
          const res = await axios.post('/gamelibrary/api/developers', newDeveloper);
          
          Dispatch({ type: ADD_DEVELOPER, payload: res.data });
        }
        catch (err)
        {
          Dispatch({ type: DEVELOPER_ERROR, payload: err.response.msg });
        }
    };

    // Updates current developer
    const UpdateDeveloper = async developer =>
    {
      try
      {
        const res = await axios.put(`/gamelibrary/api/developers/${developer._id}`, developer);
        Dispatch({ type: UPDATE_DEVELOPER, payload: res.data });
      }
      catch (err)
      {
        Dispatch({ type: DEVELOPER_ERROR, payload: err.response.msg });
      }
    }

    // Deletes current developer
    const RemoveDeveloper = async developer =>
    {
      try
      {
        await axios.delete(`/gamelibrary/api/developers/${developer._id}`);

        Dispatch({ type: REMOVE_DEVELOPER, payload: developer._id });
      }
      catch (err)
      {
        Dispatch({ type: DEVELOPER_ERROR, payload: err.response.msg });
      }
    }

    // Filter developers by name
    const FilterDevelopers = name => 
    {
      SetLoading();
      Dispatch({ type: FILTER_DEVELOPERS, payload: name })
    };

    // Set current selected developer
    const SetCurrentDeveloper = currentDeveloper => Dispatch({ type: SET_CURRENT_DEVELOPER, payload: currentDeveloper});
    
    // Set loading state to true
    const SetLoading = () => Dispatch({ type: SET_LOADING });

    // Sets the currenty selected page of developers 
    const SetCurrentPage = selectedPage => Dispatch({ type: SET_CURRENT_PAGE, payload: selectedPage });

    const providerValue = 
    {
        developers: state.developers,
        current: state.current,
        filtered: state.filtered,
        loading: state.loading,
        pageSize: state.pageSize,
        pageNumber: state.pageNumber,
        totalPages: state.totalPages,
        currentPage: state.currentPage,
        config: state.config,
        AddDeveloper,
        GetDevelopers,
        UpdateDeveloper,
        RemoveDeveloper,
        FilterDevelopers,
        SetCurrentDeveloper,
        SetCurrentPage
    };

    return (
        <DeveloperContext.Provider value={providerValue}>
          {props.children}
        </DeveloperContext.Provider>
    );
};

export default DeveloperState;