import { AnyAction } from 'redux';
import { CurrentUser } from '../../currentUser/currentUser';
import appModeReducer, { appMode } from './appMode/appMode.reducerr';
import confirmModalReducer from './confirm-modal/confirm-modal.reducer';
import exportModalReducer from './export-modal/export-modal.reducer';
import importModalReducer from './import-modal/import-modal.reducer';
import importTypeModalReducer from './import-type-modal/import-type-modal.reducer';
import inspectedElementReducer from './inspected-element/inspected-element.reducer';
import navigationReducer, { initialNavigationState } from './navigation/navigation.reducer';
import settingsReducer, { initialSettingsState } from './settings/settings.reducer';
import storageReducer, { initialStirageState } from './storage/storage.reducer';
import syncDataReducer from './syncDataQueue/syncDataQueue.reducer';
import { UserActions } from './user/user.actions';
import userReducer from './user/user.reducer';

export default function rootReducer(state: any = {}, action: AnyAction) {
  if(action.type === UserActions.USER_LOGOUT) {
    return {
      // tab navigation
      navigation: initialNavigationState,
      // storage
      storage: initialStirageState,
      // inspected Element
      inspectedElement: null,
      // tab settings
      settings: initialSettingsState,
      // modals
      modal: {
        confirmModal: { show: false },
        importModal: { show: false },
        exportModal: { show: false },
        importTypeModal: { show: false },
      },
      user: new CurrentUser(),
      appMode: appMode.USER,
      usersModificationData: [],
      syncDataQueue: {}
    };

    return {};
  }

  return {
    // tab navigation
    navigation: navigationReducer(state.navigation, action),
    // storage
    storage: storageReducer(state.storage, action),
    // inspected Element
    inspectedElement: inspectedElementReducer(state.inspectedElement, action),
    // tab settings
    settings: settingsReducer(state.settings, action),
    // modals
    modal: {
      confirmModal: confirmModalReducer(state.confirmModal, action),
      importModal: importModalReducer(state.importModal, action),
      exportModal: exportModalReducer(state.exportModal, action),
      importTypeModal: importTypeModalReducer(state.importTypeModal, action),
    },
    user: userReducer(state.user, action),
    appMode: appModeReducer(state.appMode, action),
    syncDataQueue: syncDataReducer(state.syncDataQueue, action),
    roles: []
  };
}