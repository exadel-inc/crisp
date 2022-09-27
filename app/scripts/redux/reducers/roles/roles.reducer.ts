import { AnyAction } from 'redux';
import { ActionTypes } from './roles.actions';

class UserRole {
  public id: string;
  public name: string;
  constructor(id: string = '', name: string = 'USER') {
    this.id = id;
    this.name = name;
  }
}

export default function RoleReducer(state: UserRole[] = [], action: AnyAction): UserRole[] {
  switch (action.type) {
    case ActionTypes.INIT_ROLES: {
      let data: UserRole[]  = [];

      action.payload.forEach((role: any) => {
        data.push(
          new UserRole(role.id || role._id, role.name)
        );
      });

      return data;
    }

    default:
      return state;
  }
}