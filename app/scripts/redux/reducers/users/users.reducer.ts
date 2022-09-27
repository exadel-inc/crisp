import { AnyAction } from 'redux';
import { UsersActionTypes } from './users.actions';

export default function usersReducer(state: any[] = [], action: AnyAction) {
  switch (action.type) {
    case UsersActionTypes.INIT_USERS: {
      return action.payload.data || state;
    }
    case UsersActionTypes.USER_CREATED: {
      return [
        ...state,
        action.payload.data
      ];
    }
    case UsersActionTypes.USER_UPDATED: {
      const id: string = action.payload.key;
      const data = action.payload.data;

      return state.map((item: any) => {
        return item.id === id ? {
          ...item,
          ...data
        }: item;
      });
    }
    case UsersActionTypes.USER_REMOVED: {
      const id: string = action.payload.key;
      return state.filter((item: any) => item.id !== id);
    }
    default:
      return state;
  }
}