import { Action } from 'redux';
import { StorageState } from './storage.reducer';

export enum ActionTypes {
  WRITE_TO_STORAGE = '[Storage] write to storage',
  WRITE_ALL_TO_STORAGE = '[Storage] write all data to storage',
}

export class WriteToStorageAction implements Action {
  constructor(public payload: {key: string; data: Array<any>}) {}
  readonly type = ActionTypes.WRITE_TO_STORAGE;
}

export class WriteAllDataToStorageAction implements Action {
  constructor(public payload: StorageState) {}
  readonly type = ActionTypes.WRITE_ALL_TO_STORAGE;
}