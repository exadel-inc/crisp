import { Action } from 'redux';

export enum UsersActionTypes {
  INIT_USERS = '[Storage] init users',
  USER_CREATED = '[Storage] user created',
  USER_UPDATED = '[Storage] user updated',
  USER_REMOVED = '[Storage] user removed'
}

export class InitUsersToStorageAction implements Action {
  constructor(public payload: any) {}
  readonly type = UsersActionTypes.INIT_USERS;
}

export class UpdatedUsersInStorageAction implements Action {
  constructor(public payload: any) {}
  readonly type = UsersActionTypes.USER_UPDATED;
}

export class RemovedUsersFromStorageAction implements Action {
  constructor(public payload: any) {}
  readonly type = UsersActionTypes.USER_REMOVED;
}

export class CreatedUserForStorageAction implements Action {
  constructor(public payload: any) {}
  readonly type = UsersActionTypes.USER_CREATED;
}