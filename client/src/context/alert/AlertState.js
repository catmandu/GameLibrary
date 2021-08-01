import React, { useReducer } from 'react';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';
import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlertState = props => 
{
  const alertTimeout = 5000;

  const [state, Dispatch] = useReducer(AlertReducer, null);

  // Set Alert
  const SetAlert = (msg, type) =>
  {
    Dispatch({ type: SET_ALERT, payload: { msg, type } });
    window.scrollTo(0, 0);
    setTimeout(() => RemoveAlert(), alertTimeout);
  };

  // Remove Alert
  const RemoveAlert = () =>
  {
    Dispatch({ type: REMOVE_ALERT });
  };

  const providerValue =
  {
    alert: state,
    SetAlert,
    RemoveAlert
  };
  return (
    <AlertContext.Provider value={providerValue}>
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
