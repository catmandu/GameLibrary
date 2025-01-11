import React, { useReducer } from 'react';
import axios from 'axios';
import UserContext from './userContext';
import UserReducer from './userReducer';
import { useNavigate } from 'react-router-dom';

import {
  LOGIN_USER,
  LOGOUT_USER,
  ADD_USER,
  UPDATE_USER,
  GET_USER,
  SET_CURRENT_USER,
  USER_ERROR,
  SET_LOADING,
} from '../../types';

const UserProvider = (props) => {
  const initialState = {
    user: null,
  };

  const [state, Dispatch] = useReducer(UserReducer, initialState);
  const navigate = useNavigate();

  // Add User
  const AddUser = async (newUser) => {
    SetLoading();
    try {
      const res = await axios.post('/gamelibrary/api/users/login', newUser);

      Dispatch({ type: ADD_USER, payload: res.data.result });
    } catch (err) {
      Dispatch({ type: USER_ERROR, payload: err.response.msg });
    }
  };

  // Login User
  const LoginUser = async (user) => {
    SetLoading();
    try {
      const res = await axios.post('/gamelibrary/api/users/login', user);
      if (res.status === 200) {
        Dispatch({ type: LOGIN_USER, payload: res.data });
        navigate('/');
      }
    } catch (err) {
      Dispatch({ type: USER_ERROR, payload: err.response.msg });
    }
  };

  // Get Active User
  const GetUser = async () => {
    SetLoading();
    try {
      const res = await axios.get('/gamelibrary/api/users/refresh-token', {
        validateStatus: false,
      });

      if (res.status === 404) {
        Dispatch({ type: GET_USER, payload: null });
        navigate('/user');
        return;
      }

      Dispatch({ type: GET_USER, payload: res.data });
    } catch (err) {
      Dispatch({ type: USER_ERROR, payload: err.response.msg });
    }
  };

  // Updates the current user
  const UpdateUser = async (user) => {
    try {
      const res = await axios.put(`/gamelibrary/api/users/${user._id}`, user);
      Dispatch({ type: UPDATE_USER, payload: res.data });
    } catch (err) {
      Dispatch({ type: USER_ERROR, payload: err.response.msg });
    }
  };

  // Logs out the current user
  const LogoutUser = async (user) => {
    SetLoading();
    try {
      const res = await axios.post(`/gamelibrary/api/users/logout`, user);
      if (res.status === 200) {
        Dispatch({ type: LOGOUT_USER });

        navigate('/user');
      }
    } catch (err) {
      Dispatch({ type: USER_ERROR, payload: err.response.msg });
    }
  };

  // Set current selected user
  const SetCurrentUser = (currentUser) =>
    Dispatch({ type: SET_CURRENT_USER, payload: currentUser });

  // Set loading state to true
  const SetLoading = () => Dispatch({ type: SET_LOADING });

  const providerValue = {
    user: state.user,
    loading: state.loading,
    LoginUser,
    AddUser,
    GetUser,
    UpdateUser,
    LogoutUser,
    SetCurrentUser,
  };

  return (
    <UserContext.Provider value={providerValue}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
