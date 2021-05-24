import { Action } from 'redux';
import { NavigationTabType } from '../../../components/header/navigation-tabs';

export enum ActionTypes {
  NAVIGATE = '[Navigation] navigate',
}

export class NavigateAction implements Action {
  constructor(public payload: NavigationTabType) {}
  readonly type = ActionTypes.NAVIGATE;
}
