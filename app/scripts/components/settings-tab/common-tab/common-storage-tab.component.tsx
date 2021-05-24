import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { SettingsEntityType } from '../../../shared/settings-constants';
import { useExportModal } from '../../shared/export-modal/export-modal';
import { useImportModal } from '../../shared/import-modal/import-modal';
import { SettingsCommonTabType } from './common-navigation.component';

/**
 * Settings storage tab
*/
export function StorageTab() {
  /**
   * Is current tab active
  */
  const isActive = useSelector((state: RootState) => state.settings.common.tab) === SettingsCommonTabType.STORAGE;

  /**
   * create Import modal
  */
  const showImportModal = useImportModal();

  /**
   * create Export modal
  */
  const showExportModal = useExportModal();

  /**
   * Import button handler function
  */
  const handleImport = () => {
    showImportModal({entity: SettingsEntityType.STORAGE});
  };

  /**
   * Export button handler function
  */
  const handleExport = () => {
    showExportModal({entity: SettingsEntityType.STORAGE});
  };

  // prevent rendering if tab is not active
  if (!isActive) return (<div></div>);

  return isActive ? (
    <div
      id={SettingsCommonTabType.STORAGE}
      className={`tab-pane fade ${isActive ? 'show active' : ''}`}
      data-editor="none"
    >
      <div className="container">
        <div className="row">
          <div className="col-3 d-flex justify-content-center mt-1">
            <button type="button"
              className="btn btn-sm btn-primary btn-block option-btn-load-data"
              data-for="storage"
              onClick={handleImport}
            >Import storage</button>
          </div>
          <div className="col-3 d-flex justify-content-center mt-1">
            <button type="button"
              className="btn btn-sm btn-primary btn-block option-btn-save-data"
              data-for="storage"
              onClick={handleExport}
            >Export storage</button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
