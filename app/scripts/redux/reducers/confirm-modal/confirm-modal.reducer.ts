import { AnyAction } from 'redux';
import { ConfirmModalState } from '../../../components/shared/confirm-modal/confirm-modal';
import { ActionTypes } from './confirm-modal.actions';

export default function confirmModalReducer(state: ConfirmModalState = { show: false }, action: AnyAction) {
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