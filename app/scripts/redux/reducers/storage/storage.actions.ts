import { Action } from 'redux';

export enum ActionTypes {
  WRITE_TO_STORAGE = '[Storage] write to storage',
}

export class WriteToStorageAction implements Action {
  constructor(public payload: {key: string; data: Array<any>}) {}
  readonly type = ActionTypes.WRITE_TO_STORAGE;
}
