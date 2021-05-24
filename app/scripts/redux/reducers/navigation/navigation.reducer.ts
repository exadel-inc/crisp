import { AnyAction } from 'redux';
import { NavigationTabType } from '../../../components/header/navigation-tabs';
import { ActionTypes } from './navigation.actions';

export interface NavigationState {
  tab: NavigationTabType;
}

const initialState: NavigationState = {
  tab: NavigationTabType.MAIN,
};

export default function navigationReducer(state: NavigationState = initialState, action: AnyAction): NavigationState {
  switch (action.type) {
    case ActionTypes.NAVIGATE: {

      return {
        ...state,
        tab: action.payload,
      };
    }

    default:
      return state;
  }
}