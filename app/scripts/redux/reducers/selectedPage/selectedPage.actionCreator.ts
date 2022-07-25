import {CLEAR_SELECTED_PAGE_ID, SET_SELECTED_PAGE_ID} from './selectedPage.actions';

export const setSelectedPageId = (payload: number) => ({
  type: SET_SELECTED_PAGE_ID,
  payload
});

export const clearSelectedPageId = () => ({
  type: CLEAR_SELECTED_PAGE_ID
});
