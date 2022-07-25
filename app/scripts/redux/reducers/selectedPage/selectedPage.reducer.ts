import {CLEAR_SELECTED_PAGE_ID, SET_SELECTED_PAGE_ID} from './selectedPage.actions';
import {AnyAction} from 'redux';

export const selectedPageReducer = (state = null, action: AnyAction) => {
  switch (action.type) {
    case SET_SELECTED_PAGE_ID:
      return action.payload;
    case CLEAR_SELECTED_PAGE_ID:
      return  null;
    default:
      return state;
  }
};
