import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HideAction } from '../../../redux/reducers/import-modal/import-modal.actions';
import { RootState } from '../../../redux/store';
import { ImportExportUtils } from '../../settings-tab/shared/option/import-export.utils';
import { useImportTypeModal } from '../import-type-confirmation-modal/import-type-modal';
import { showToast } from '../toasts-component';

const selector = (state: RootState) => state.modal.importModal;
/**
 * Import Modal
 */
export const ImportModal = () => {

  const showImportTypeModal = useImportTypeModal();

  const dispatch = useDispatch();

  const { show, entity, onCancel } = useSelector(selector);

  const callback = (confirm: boolean) => {
    dispatch({...new HideAction()});
    if (confirm) {
      handleImport();
    } else {
      onCancel?.();
    }
  };

  const [importValue, setImportValue] = useState('');

  const handleFileImportChange = (files: FileList | null) => {
    if (files) {
      ImportExportUtils.populateImportedFileData(files, setImportValue);
    }
  };

  const handleImport = () => {
    if (entity) {
      ImportExportUtils.showImportTypeModal = showImportTypeModal;
      ImportExportUtils.loadData(
        entity,
        importValue,
        () => dispatch({...new HideAction()}),
        (message: string) => {
          showToast(message, 'success');
          setImportValue('');
        },
      );
    }
  }; 

  return (
    <>
      <div className={`modal fade ${show ? 'show' : ''}`}
        style={{display: show ? 'block' : 'none'}}
        id="import-modal"
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Import</h5>
              <button type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => callback(false)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <div className="row">
                  <div className="col-12">
                    <p>Please paste valid JSON to import:</p>
                    <textarea className="form-control form-control-sm"
                      rows={6}
                      data-for="import-data-text"
                      value={importValue}
                      onChange={(event) => setImportValue(event.target.value)}
                    ></textarea>
                  </div>
                  <div className="col-12">
                    <p>Or import from file:</p>
                    <input accept=".json"
                      type="file"
                      name="import-file"
                      data-for="import-data-file"
                      onChange={(event) => handleFileImportChange(event.target.files)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={() => callback(false)}
              >Cancel</button>
              <button type="button"
                id="import-modal-import-button"
                className="btn btn-primary"
                onClick={() => callback(true)}
              >Import</button>
            </div>
          </div>
        </div>
      </div>
      <div style={{display: show ? 'block' : 'none'}}
        className={`modal-backdrop fade ${show ? 'show' : ''}`}
      ></div>
    </>
  );
};
