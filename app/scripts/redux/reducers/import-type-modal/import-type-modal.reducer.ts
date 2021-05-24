import { AnyAction } from 'redux';
import { ImportTypeModalState } from '../../../components/shared/import-type-confirmation-modal/import-type-modal';
import { ActionTypes } from './import-type-modal.actions';

export default function importTypeModalReducer(state: ImportTypeModalState = { show: false }, action: AnyAction) {
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