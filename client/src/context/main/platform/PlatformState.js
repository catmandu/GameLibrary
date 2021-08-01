import React, { useReducer } from 'react';
import axios from 'axios';
import PlatformContext from './platformContext';
import PlatformReducer from './platformReducer';

import 
{
  GET_PLATFORMS,
  ADD_PLATFORM,
  UPDATE_PLATFORM,
  REMOVE_PLATFORM,
  PLATFORM_ERROR,
  FILTER_PLATFORMS,
  SET_CURRENT_PLATFORM,
  SET_CURRENT_PAGE,
  SET_LOADING
} from '../../types';

const PlatformState = props => 
{
    const initialState = 
    {
      platforms: [],
      filtered: null,
      current: null,
      pageSize: 15,
      pageNumber: 1,
      totalPages: 0,
      currentPage: []
    };
    
    const [state, Dispatch] = useReducer(PlatformReducer, initialState);

    // Get Platforms
    const GetPlatforms = async () => 
    {
        SetLoading();
        try 
        {
          const res = await axios.get('/gamelibrary/api/platforms');
          Dispatch({ type: GET_PLATFORMS, payload: res.data });
          SetCurrentPage(state.pageNumber);
        }
        catch (err)
        {
          Dispatch({ type: PLATFORM_ERROR, payload: err.response.msg });
        }
    };

    // Add new platform
    const AddPlatform = async newPlatform => 
    {
        try 
        {
          const res = await axios.post('/gamelibrary/api/platforms', newPlatform);
          Dispatch({ type: ADD_PLATFORM, payload: res.data });
        }
        catch (err)
        {
          Dispatch({ type: PLATFORM_ERROR, payload: err.response.msg });
        }
    };

    // Update current platform
    const UpdatePlatform = async platform =>
    {
      try
      {
        const res = await axios.put(`/gamelibrary/api/platforms/${platform._id}`, platform);
        Dispatch({ type:UPDATE_PLATFORM, payload: res.data });
      }
      catch(err)
      {
        Dispatch({ type: PLATFORM_ERROR, payload: err.response.msg });
      }
    };

    // Deletes the current platform
    const RemovePlatform = async platform =>
    {
      try
      {
        await axios.delete(`/gamelibrary/api/platforms/${platform._id}`);
        Dispatch({ type: REMOVE_PLATFORM, payload: platform._id });
      }
      catch(err)
      {
        Dispatch({ type: PLATFORM_ERROR, payload: err.response.msg });
      }
    };

    // Filter platforms by name
    const FilterPlatforms = name =>
    {
        SetLoading();
        Dispatch({ type: FILTER_PLATFORMS, payload: name });
    };

    // Set current selected platform
    const SetCurrentPlatform = currentPlatform =>Dispatch({ type: SET_CURRENT_PLATFORM, payload: currentPlatform });
    
    const SetLoading = () => Dispatch({ type: SET_LOADING });

    const SetCurrentPage = selectedPage => Dispatch({ type: SET_CURRENT_PAGE, payload: selectedPage });

    const providerValue =
    {
        platforms: state.platforms,
        filtered: state.filtered,
        current: state.current,
        loading: state.loading,
        pageSize: state.pageSize,
        pageNumber: state.pageNumber,
        totalPages: state.totalPages,
        currentPage: state.currentPage,
        GetPlatforms,
        AddPlatform,
        UpdatePlatform,
        RemovePlatform,
        FilterPlatforms,
        SetCurrentPlatform,
        SetCurrentPage
    };

    return (
        <PlatformContext.Provider value={providerValue}>
          {props.children}
        </PlatformContext.Provider>
    );
};

export default PlatformState;