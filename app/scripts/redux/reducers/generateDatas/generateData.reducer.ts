import { AnyAction } from 'redux';
import { GenerateDataActions } from './generateData.actions';

export interface IGenerateData {
  pageObjects: string;
  testActions: string;
}

export const InitGenerateData: IGenerateData = {
  pageObjects: '',
  testActions: ''
};

export default function generateDatasReducer(state: IGenerateData = InitGenerateData, action: AnyAction) {
  switch (action.type) {
    case GenerateDataActions.GENERATE_PAGE_OBJECTS:
    case GenerateDataActions.GENERATE_AND_INSERT_PAGE_OBJECTS: {
      return {...state, pageObjects: action.payload};
    }
    case GenerateDataActions.GENERATE_TEST_ACTIONS:
    case GenerateDataActions.GENERATE_AND_INSERT_TEST_ACTIONS: {
      return {...state, testActions: action.payload};
    }
    case GenerateDataActions.GENERATE_ALL:
    case GenerateDataActions.GENERATE_AND_INSERT_ALL: {
      return {
        ...state,
        pageObjects: action.payload.pageObjects,
        testActions: action.payload.testActions
      };
    }

    default:
      return state;
  }
}