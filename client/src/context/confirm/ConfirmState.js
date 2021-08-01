import React, { useReducer } from 'react';
import ConfirmContext from './confirmContext';
import ConfirmReducer from './confirmReducer';
import { SET_CONFIRM, REMOVE_CONFIRM } from '../types';

const ConfirmState = props => 
{
  const [state, Dispatch] = useReducer(ConfirmReducer, null);

  // Set Confirm
  const SetConfirm = (title, message, Action) => Dispatch({ type: SET_CONFIRM, payload: { title, message, Action } });

  // Remove Confirm
  const RemoveConfirm = () => Dispatch({ type: REMOVE_CONFIRM });

  const providerValue =
  {    
    confirm: state,
    SetConfirm,
    RemoveConfirm
  };
  return (
    <ConfirmContext.Provider value={providerValue}>
      {props.children}
    </ConfirmContext.Provider>
  );
};

export default ConfirmState;
