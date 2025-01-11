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

const UserReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_USER: {
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    }
    case ADD_USER: {
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    }
    case GET_USER: {
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    }
    case UPDATE_USER: {
      return {
        ...state,
      };
    }
    case LOGOUT_USER: {
      return {
        ...state,
        user: null,
        loading: false,
      };
    }
    case SET_CURRENT_USER: {
      return {
        ...state,
        current: action.payload,
      };
    }
    case SET_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case USER_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default UserReducer;
