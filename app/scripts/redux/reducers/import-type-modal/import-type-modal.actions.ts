import { Action } from 'redux';
import { ImportTypeModalState } from '../../../components/shared/import-type-confirmation-modal/import-type-modal';

export enum ActionTypes {
  SHOW = '[Import Type Modal] Show import type confirmation modal',
  HIDE = '[Import Type Modal] Hide import type confirmation modal',
}

export class ShowAction implements Action {
  constructor(public readonly payload: Omit<ImportTypeModalState, 'show'>) {}
  readonly type = ActionTypes.SHOW;
}

export class HideAction implements Action {
  constructor() {}
  readonly type = ActionTypes.HIDE;
}