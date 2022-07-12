import { Action } from 'redux';

export enum syncDataQueueTypes {
  WRITE_TO_STORAGE = '[Storage] write to storage'
};

export class WriteTosyncDataQueueAction implements Action {
  constructor(public payload: {key: string; data: Array<any>}) {};
  readonly type = syncDataQueueTypes.WRITE_TO_STORAGE;
};
