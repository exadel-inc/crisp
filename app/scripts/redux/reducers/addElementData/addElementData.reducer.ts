import { AnyAction } from 'redux';
import { AddElementActions } from './addElementData.actions';

export enum appMode {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export default function addElementReducer(state: any = null, action: AnyAction) {
  switch (action.type) {
    case AddElementActions.INIT_DATA: {
      return action.payload.data;
    }
    case AddElementActions.ADD_ITEM: {
      const key = action.payload.key;
      const data = action.payload.data;
      return key === 'projectId'? {
        ...state,
        projectId: data
      }: {
        ...state,
        elementData: {
          ...state.elementData,
          [key]: data
        }
      };
    }
    case AddElementActions.CLEAR: {
      return null;
    }

    default:
      return state;
  }
}