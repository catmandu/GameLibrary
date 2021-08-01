import React, { useReducer } from 'react';
import axios from 'axios';
import PublisherContext from './publisherContext';
import PublisherReducer from './publisherReducer';

import 
{
  GET_PUBLISHERS,
  ADD_PUBLISHER,
  UPDATE_PUBLISHER,
  REMOVE_PUBLISHER,
  FILTER_PUBLISHERS,
  SET_CURRENT_PUBLISHER,
  SET_CURRENT_PAGE,
  PUBLISHER_ERROR,
  SET_LOADING
} from '../../types';

const PublisherState = props => 
{
    const initialState = 
    {
      publishers: [],
      filtered: null,
      current: null,
      pageSize: 15,
      pageNumber: 1,
      totalPages: 0,
      currentPage: []
    };
    
    const [state, Dispatch] = useReducer(PublisherReducer, initialState);

    // Get Publishers
    const GetPublishers = async () => 
    {
        SetLoading();
        try 
        {
          const res = await axios.get('/gamelibrary/api/publishers');
          Dispatch({ type: GET_PUBLISHERS, payload: res.data });
          SetCurrentPage(state.pageNumber);
        }
        catch (err)
        {
          console.log(err)
          Dispatch({ type: PUBLISHER_ERROR, payload: err.response.msg });
        }
    };

    // Add new publisher
    const AddPublisher = async newPublisher => 
    {
        try 
        {
          const res = await axios.post('/gamelibrary/api/publishers', newPublisher);
          Dispatch({ type: ADD_PUBLISHER, payload: res.data });
        }
        catch (err)
        {
          Dispatch({ type: PUBLISHER_ERROR, payload: err.response.msg });
        }
    };

    // Update current publisher
    const UpdatePublisher = async publisher =>
    {
      try
      {
        const res = await axios.put(`/gamelibrary/api/publishers/${publisher._id}`, publisher);
        Dispatch({ type: UPDATE_PUBLISHER, payload: res.data });
      }
      catch(err)
      {
        Dispatch({ type: PUBLISHER_ERROR, payload: err.response.msg });
      }
    };

    // Deletes the current publisher
    const RemovePublisher = async publisher =>
    {
      try
      {
        await axios.delete(`/gamelibrary/api/publishers/${publisher._id}`);
        Dispatch({ type: REMOVE_PUBLISHER, payload: publisher._id });
      }
      catch(err)
      {
        Dispatch({ type: PUBLISHER_ERROR, payload: err.response.msg });
      }
    }

    // Filters publishers by name
    const FilterPublishers = name =>
    {
        SetLoading();
        Dispatch({ type: FILTER_PUBLISHERS, payload:name });
    };

    // Sets the current developer selected
    const SetCurrentPublisher = currentPublisher => Dispatch({ type: SET_CURRENT_PUBLISHER, payload:currentPublisher });

    // Set loading
    const SetLoading = () => Dispatch({ type: SET_LOADING });

    const SetCurrentPage = selectedPage => Dispatch({ type: SET_CURRENT_PAGE, payload: selectedPage });

    const providerValue = 
    {
        publishers: state.publishers,
        filtered: state.filtered,
        current: state.current,
        loading: state.loading,
        pageSize: state.pageSize,
        pageNumber: state.pageNumber,
        totalPages: state.totalPages,
        currentPage: state.currentPage,
        GetPublishers,
        AddPublisher,
        UpdatePublisher,
        RemovePublisher,
        FilterPublishers,
        SetCurrentPublisher,
        SetCurrentPage
    };

    return (
        <PublisherContext.Provider value={providerValue}>
          {props.children}
        </PublisherContext.Provider>
    );
};

export default PublisherState;