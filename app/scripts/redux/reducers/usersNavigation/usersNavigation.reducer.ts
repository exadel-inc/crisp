import { AnyAction } from 'redux';
import { UsersNavigationActions } from './usersNavigarion.actions';

export enum usersNavigationTabsType {
  REMOVE = 'users manager remove tab',
  MAIN = 'users manager main tab',
  UPDATE = 'users manager update tab',
  CREATE = 'users manager create tab'
}

export interface UsersNavigationState {
  tab: usersNavigationTabsType;
  selectedUser: any;
}

export const initialUsersNavigationState: UsersNavigationState = {
  tab: usersNavigationTabsType.MAIN,
  selectedUser: undefined
};

export default function usersNavigationReducer(state: UsersNavigationState = initialUsersNavigationState, action: AnyAction): UsersNavigationState {
  switch (action.type) {
    case UsersNavigationActions.REMOVE_USER:
    case UsersNavigationActions.USERS_LIST: {

      return {
        ...state,
        tab: action.payload.tabName,
        selectedUser: undefined
      };
    }

    case UsersNavigationActions.UPDATE_USER: {

      return {
        ...state,
        tab: action.payload.tabName,
        selectedUser: action.payload.selectedUser
      };
    }

    case UsersNavigationActions.CREATE_USER: {

      return {
        ...state,
        tab: action.payload.tabName,
        selectedUser: undefined
      };
    }

    default:
      return state;
  }
}