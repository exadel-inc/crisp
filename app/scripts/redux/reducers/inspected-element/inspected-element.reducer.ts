import { AnyAction } from 'redux';
import { CrispElement } from '../../../elements/element';
import { ActionTypes } from './inspected-element.actions';

export default function inspectedElementReducer(state: CrispElement | null = null, action: AnyAction) {
  switch (action.type) {
    case ActionTypes.SET_INSPECTED_ELEMENT: {
      return action.payload;
    }

    case ActionTypes.RESET_INSPECTED_ELEMENT: {
      return null;
    }

    default:
      return state;
  }
}