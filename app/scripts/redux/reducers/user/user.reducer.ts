import { AnyAction } from 'redux';
import { CurrentUser } from '../../../currentUser/currentUser';
import { UserActions } from './user.actions';

export default function userReducer(state: CurrentUser = new CurrentUser(), action: AnyAction) {
  switch (action.type) {
    case UserActions.USER_LOGIN: {
      return action.payload.data;
    }
    case UserActions.USER_SET_HOST: {
      return {
        ...state,
        host: action.payload.data
      };
    }

    default:
      return state;
  }
}