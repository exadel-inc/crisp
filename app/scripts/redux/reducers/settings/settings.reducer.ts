import { AnyAction } from 'redux';
import { SettingsActions } from './settings.actions';

import { SettingsTabType } from '../../../components/settings-tab/settings-navigation.component';
import { SettingsCommonTabType } from '../../../components/settings-tab/common-tab/common-navigation.component';
import { SettingsProjectTabType } from '../../../components/settings-tab/project-tab/project-navigation.component';
import { SettingsFrameworkTabType } from '../../../components/settings-tab/framework-tab/framework-navigation.component';

interface IOptionsFilter {
  key: string;
  value: string;
}

interface ISubTabState {
  filter: OptionsFilter;
  isEditing: boolean;
}

type OptionsFilter = IOptionsFilter | {};

export interface SettingsState {
  tab: SettingsTabType;
  common: {
    tab: SettingsCommonTabType;
    storage: ISubTabState;
  };
  project: {
    tab: SettingsProjectTabType;
    config: ISubTabState;
    pages: ISubTabState;
  };
  framework: {
    tab: SettingsFrameworkTabType;
    config: ISubTabState;
    objects: ISubTabState;
    actions: ISubTabState;
  };
};

const initialState: SettingsState = {
  tab: SettingsTabType.FRAMEWORK,
  common: {
    tab: SettingsCommonTabType.STORAGE,
    storage: {
      filter: {},
      isEditing: false,
    },
  },
  project: {
    tab: SettingsProjectTabType.CONFIG,
    config: {
      filter: {},
      isEditing: false,
    },
    pages: {
      filter: {},
      isEditing: false,
    },
  },
  framework: {
    tab: SettingsFrameworkTabType.CONFIG,
    config: {
      filter: {},
      isEditing: false,
    },
    objects: {
      filter: {},
      isEditing: false,
    },
    actions: {
      filter: {},
      isEditing: false,
    },
  },
};

export default function settingsReducer(state: SettingsState = initialState, action: AnyAction): SettingsState {
  switch (action.type) {
    case SettingsActions.NAVIGATE: {
      return {
        ...state,
        tab: action.payload,
      };
    }

    // navigate reducers
    case SettingsActions.NAVIGATE_COMMON: {
      const common = { ...state.common };
      common.tab = action.payload;
      return {
        ...state,
        common,
      };
    }

    case SettingsActions.NAVIGATE_PROJECT: {
      const project = { ...state.project };
      project.tab = action.payload;
      return {
        ...state,
        project,
      };
    }

    case SettingsActions.NAVIGATE_FRAMEWORK: {
      const framework = { ...state.framework };
      framework.tab = action.payload;
      return {
        ...state,
        framework,
      };
    }

    // edit reducers
    case SettingsActions.EDIT_PROJECT: {

      const project = { ...state.project };

      switch (action.tab) {
        case SettingsProjectTabType.CONFIG:
          project.config.isEditing = action.payload;
          break;
        case SettingsProjectTabType.PAGES:
          project.pages.isEditing = action.payload;
          break;
      }

      return {
        ...state,
        project,
      };
    }

    case SettingsActions.EDIT_FRAMEWORK: {

      const framework = { ...state.framework };

      switch (action.tab) {
        case SettingsFrameworkTabType.CONFIG:
          framework.config.isEditing = action.payload;
          break;
        case SettingsFrameworkTabType.ACTIONS:
          framework.actions.isEditing = action.payload;
          break;
        case SettingsFrameworkTabType.OBJECTS:
          framework.objects.isEditing = action.payload;
          break;
      }

      return {
        ...state,
        framework,
      };
    }

    // filter reducers
    case SettingsActions.FILTER_PROJECT: {

      const project = { ...state.project };

      switch (action.tab) {
        case SettingsProjectTabType.CONFIG:
          project.config.filter = { ...project.config.filter, ...action.payload };
          break;
        case SettingsProjectTabType.PAGES:
          project.pages.filter = { ...project.pages.filter, ...action.payload };
          break;
      }

      return {
        ...state,
        project,
      };
    }

    // filter reducers
    case SettingsActions.FILTER_FRAMEWORK: {

      const framework = { ...state.framework };

      switch (action.tab) {
        case SettingsFrameworkTabType.CONFIG:
          framework.config.filter = { ...framework.config.filter, ...action.payload };
          break;
        case SettingsFrameworkTabType.OBJECTS:
          framework.objects.filter = { ...framework.objects.filter, ...action.payload };
          break;
        case SettingsFrameworkTabType.ACTIONS:
          framework.actions.filter = { ...framework.actions.filter, ...action.payload };
          break;
      }

      return {
        ...state,
        framework,
      };
    }

    default:
      return state;
  }
}
