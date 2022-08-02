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

export const initialStirageState: StorageState = {
  pages: [],
  projects: [],
  elements: [],
  framework: [],
  patterns: []
};

const updateItem = (state: any, payload: any) => {
  const itemKey: string = payload.key;

  state[itemKey] = state[itemKey].map((item: any) => {
    return (item._id || item.id)  === payload.id ? {
      ...item,
      ...payload.data
    } : item;
  });

  return state;
};

const addItem = (state: any, payload: any) => {
  const itemKey: string = payload.key;

  state[itemKey] = [
    ...state[itemKey],
    payload.data
  ];

  return state;
};

const removeItem = (state: any, payload: any) => {
  const itemKey: string = payload.key;

  state[itemKey] = state[itemKey].filter((item: any) => {
    return (item._id || item.id) !== payload.id;
  });

  return state;
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

    case ActionTypes.UPDATE_STORAGE_ITEM: {
      return updateItem(state, action.payload);
    }

    case ActionTypes.DELETE_STORAGE_ITEM: {
      return removeItem(state, action.payload);
    }

    case ActionTypes.ADD_STORAGE_ITEM: {
      return addItem(state, action.payload);
    }

    default:
      return state;
  }
}