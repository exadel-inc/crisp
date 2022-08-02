import { applyMiddleware, createStore, Store } from 'redux';
import { CrispElement } from '../elements/element';
import { logger } from './middleware/logger/logger.middleware';
import { NavigationState } from './reducers/navigation/navigation.reducer';
import { SettingsState } from './reducers/settings/settings.reducer';
import rootReducer from './reducers/root.reducer';
import { StorageState } from './reducers/storage/storage.reducer';
import { ConfirmModalState } from '../components/shared/confirm-modal/confirm-modal';
import { ImportModalState } from '../components/shared/import-modal/import-modal';
import { ExportModalState } from '../components/shared/export-modal/export-modal';
import { ImportTypeModalState } from '../components/shared/import-type-confirmation-modal/import-type-modal';

import { CurrentUser, UserRole } from '../currentUser/currentUser';
import { appMode } from './reducers/appMode/appMode.reducerr';
import { syncDataQueueI } from './reducers/syncDataQueue/syncDataQueue.reducer';

import { UsersNavigationState } from './reducers/usersNavigation/usersNavigation.reducer';

export interface RootState {
  navigation: NavigationState;
  storage: StorageState;
  inspectedElement: CrispElement | null;
  settings: SettingsState;
  modal: {
    confirmModal: ConfirmModalState;
    importModal: ImportModalState;
    exportModal: ExportModalState;
    importTypeModal: ImportTypeModalState;
  };
  usersNavigation: UsersNavigationState;
  currentUser: CurrentUser;
  users: [];
  syncDataQueue: syncDataQueueI[];
  appMode: appMode;
  roles: UserRole[];
  selectedPageId: null;
  selectedProjectId: null;
}

const store: Store<RootState> = createStore(rootReducer, applyMiddleware(logger));

export default store;
