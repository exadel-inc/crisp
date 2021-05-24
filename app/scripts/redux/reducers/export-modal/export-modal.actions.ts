import { Action } from 'redux';
import { ExportModalState } from '../../../components/shared/export-modal/export-modal';

export enum ActionTypes {
  SHOW = '[Export Modal] Show export modal',
  HIDE = '[Export Modal] Hide export modal',
}

export class ShowAction implements Action {
  constructor(public readonly payload: Omit<ExportModalState, 'show'>) {}
  readonly type = ActionTypes.SHOW;
}

export class HideAction implements Action {
  constructor() {}
  readonly type = ActionTypes.HIDE;
}