import { AnyAction, Dispatch, Middleware } from 'redux';
import { RootState } from '../../store';

/**
 * Logs all actions and states after they are dispatched.
 */
export const logger: Middleware<Dispatch<AnyAction>, RootState, any> = store => next => action => {
  console.group(action.type);
  console.info('dispatching', action);
  const result = next(action);
  console.log('next state', store.getState());
  console.groupEnd();
  return result;
};
