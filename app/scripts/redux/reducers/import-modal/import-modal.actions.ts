import { Action } from 'redux';
import { ImportModalState } from '../../../components/shared/import-modal/import-modal';

export enum ActionTypes {
  SHOW = '[Import Modal] Show import modal',
  HIDE = '[Import Modal] Hide import modal',
}

export class ShowAction implements Action {
  constructor(public readonly payload: Omit<ImportModalState, 'show'>) {}
  readonly type = ActionTypes.SHOW;
}

export class HideAction implements Action {
  constructor() {}
  readonly type = ActionTypes.HIDE;
}