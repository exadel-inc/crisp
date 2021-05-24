import { Action } from 'redux';
import { ConfirmModalState } from '../../../components/shared/confirm-modal/confirm-modal';

export enum ActionTypes {
  SHOW = '[Confirm Modal] Show confirm modal',
  HIDE = '[Confirm Modal] Hide confirm modal',
}

export class ShowAction implements Action {
  constructor(public readonly payload: Omit<ConfirmModalState, 'show'>) {}
  readonly type = ActionTypes.SHOW;
}

export class HideAction implements Action {
  constructor() {}
  readonly type = ActionTypes.HIDE;
}