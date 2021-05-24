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
}

const store: Store<RootState> = createStore(rootReducer, applyMiddleware(logger));

export default store;
