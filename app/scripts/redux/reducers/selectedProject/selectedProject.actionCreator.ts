import {CLEAR_SELECTED_PROJECT_ID, SET_SELECTED_PROJECT_ID} from './selectedProject.actions';

export const setSelectedProjectId = (payload: number) => ({
  type: SET_SELECTED_PROJECT_ID,
  payload
});

export const clearSelectedProjectId = () => ({
  type: CLEAR_SELECTED_PROJECT_ID
});
