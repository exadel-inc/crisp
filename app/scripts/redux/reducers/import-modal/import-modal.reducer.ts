import { AnyAction } from 'redux';
import { ImportModalState } from '../../../components/shared/import-modal/import-modal';
import { ActionTypes } from './import-modal.actions';

export default function importModalReducer(state: ImportModalState = { show: false }, action: AnyAction) {
  switch (action.type) {
    case ActionTypes.SHOW: {
      return {
        show: true,
        ...action.payload,
      };
    }
    case ActionTypes.HIDE: {
      return { show: false };
    }
    default:
      return state;
  }
}