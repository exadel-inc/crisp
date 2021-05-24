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
}

const initialState: StorageState = {
  pages: [],
  projects: [],
  elements: [],
  framework: [],
  patterns: [],
};

export default function storageReducer(state: StorageState = initialState, action: AnyAction) {
  switch (action.type) {
    case ActionTypes.WRITE_TO_STORAGE: {

      return {
        ...state,
        [action.payload.key]: action.payload.data,
      };
    }

    default:
      return state;
  }
}