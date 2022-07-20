import {AnyAction} from 'redux';
import {CLEAR_SELECTED_PROJECT_ID, SET_SELECTED_PROJECT_ID} from './selectedProject.actions';

export const selectedProjectReducer = (state = null, action: AnyAction) => {
  switch (action.type) {
    case SET_SELECTED_PROJECT_ID:
      return action.payload;
    case CLEAR_SELECTED_PROJECT_ID:
      return null;
    default:
      return state;
  }
};
