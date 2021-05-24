import { AnyAction } from 'redux';
import { ExportModalState } from '../../../components/shared/export-modal/export-modal';
import { ActionTypes } from './export-modal.actions';

export default function exportModalReducer(state: ExportModalState = { show: false }, action: AnyAction) {
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