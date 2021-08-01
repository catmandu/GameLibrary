import { SET_CONFIRM, REMOVE_CONFIRM } from '../types';

const Reducer = (state, action) =>
{
  switch (action.type) 
  {
    case SET_CONFIRM: return action.payload;
    case REMOVE_CONFIRM: return null;
    default: return state;
  }
};

export default Reducer;
