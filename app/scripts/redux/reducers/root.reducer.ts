import { AnyAction } from 'redux';
import confirmModalReducer from './confirm-modal/confirm-modal.reducer';
import exportModalReducer from './export-modal/export-modal.reducer';
import importModalReducer from './import-modal/import-modal.reducer';
import importTypeModalReducer from './import-type-modal/import-type-modal.reducer';
import inspectedElementReducer from './inspected-element/inspected-element.reducer';
import navigationReducer from './navigation/navigation.reducer';
import settingsReducer from './settings/settings.reducer';
import storageReducer from './storage/storage.reducer';

export default function rootReducer(state: any = {}, action: AnyAction) {

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
    }
  };
}