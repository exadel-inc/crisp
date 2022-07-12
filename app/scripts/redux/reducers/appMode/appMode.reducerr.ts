import { AnyAction } from 'redux';
import { AppModeActions } from './appMode.actions';

export enum appMode {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export default function appModeReducer(state: appMode = appMode.USER, action: AnyAction) {
  switch (action.type) {
    case AppModeActions.ADMIN_MODE: {
      return appMode.ADMIN;
    }
    case AppModeActions.USER_MODE: {
      return appMode.USER;
    }

    default:
      return state;
  }
}