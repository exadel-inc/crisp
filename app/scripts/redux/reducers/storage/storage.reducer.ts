import { AnyAction } from 'redux';
import { CrispElement } from '../../../elements/element';
import { Framework } from '../../../framework/framework';
import { Page } from '../../../pages/page';
import { Pattern } from '../../../patterns/pattern';
import { Project } from '../../../project/project';
import { ActionTypes } from './storage.actions';

export interface StorageState {
  pages: Page[];
  projects: Project[];
  elements: CrispElement[];
  framework: Framework[];
  patterns: Pattern[];
  users: any[];
}

export const initialStirageState: StorageState = {
  pages: [],
  projects: [],
  elements: [],
  framework: [],
  patterns: [],
  users: [],
};

export default function storageReducer(state: StorageState = initialStirageState, action: AnyAction) {
  switch (action.type) {
    case ActionTypes.WRITE_TO_STORAGE: {

      return {
        ...state,
        [action.payload.key]: action.payload.data,
      };
    }

    case ActionTypes.WRITE_ALL_TO_STORAGE: {
      const newState = state ? {
        ...state,
        ...action.payload
      }: action.payload;
      console.log(`----- newState: ${newState} ----`);
      return newState;
    }

    default:
      return state;
  }
}