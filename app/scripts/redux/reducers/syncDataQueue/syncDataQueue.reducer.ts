import { AnyAction } from 'redux';
import { syncDataQueueTypes } from './syncDataQueue.actions';

export interface syncDataQueueI {
  url: string;
  data: any;
};

const initialState: syncDataQueueI = {
  url: '',
  data: {}
};

export default function syncDataReducer(state: syncDataQueueI = initialState, action: AnyAction) {
  switch (action.type) {
    case syncDataQueueTypes.WRITE_TO_STORAGE: {

      return {
        ...state,
        [action.payload.key]: action.payload.data,
      };
    }

    default:
      return state;
  }
};