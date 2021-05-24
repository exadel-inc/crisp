import { Action } from 'redux';
import { CrispElement } from '../../../elements/element';

export enum ActionTypes {
  SET_INSPECTED_ELEMENT = '[Inspected Element] Set inspected element',
  RESET_INSPECTED_ELEMENT = '[Inspected Element] Reset inspected element',
}

export class SetInspectedElementAction implements Action {
  constructor(public payload: CrispElement | null) {}
  readonly type = ActionTypes.SET_INSPECTED_ELEMENT;
}

export class ResetInspectedElementAction implements Action {
  constructor() {}
  readonly type = ActionTypes.RESET_INSPECTED_ELEMENT;
}
