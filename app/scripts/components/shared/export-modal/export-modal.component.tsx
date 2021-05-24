import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HideAction } from '../../../redux/reducers/export-modal/export-modal.actions';
import { RootState } from '../../../redux/store';
import { GetSavedData } from '../../../shared/settings-utilities';
import { ImportExportUtils } from '../../settings-tab/shared/option/import-export.utils';
import { showToast } from '../toasts-component';

const selector = (state: RootState) => state.modal.exportModal;
/**
 * Export Modal
 */
export const ExportModal = () => {

  const dispatch = useDispatch();

  const { show, entity, onCancel } = useSelector(selector);

  const inputTextAreaRef = useRef(null);

  const callback = (confirm: boolean) => {
    dispatch({...new HideAction()});
    if (!confirm) {
      onCancel?.();
    }
  };

  const [exportValue, setExportValue] = useState('');

  const [copyButtonSucces, setCopyButtonSucces] = useState(false);

  const copyButtonSuccessBlink = () => {
    setCopyButtonSucces(true);
    setTimeout(() => {
      setCopyButtonSucces(false);
    }, 1500);
  }

  /**
   * update exportValue on each entity change
   */
  useEffect(() => {
    if (entity) {
      try {
        const { data, successMessage } = new GetSavedData(entity, true);
        console.log(successMessage);
        setExportValue(data)
      } catch (error) {
        const message = (error as Error).message;
        showToast(message, 'danger');
      };
    }
  }, [entity]);

  /**
   * Downloads saved data
  */
   const downloadSavedData= () => {
    if (exportValue && entity) {
      ImportExportUtils.download(`${entity}-data.json`, exportValue);
      console.log(`Data exported to "${entity}-data.json"`);
    } else {
      showToast('No data to export', 'danger');
    }
  };


  /**
   * Copy saved data to clipboard
  */
  const copySavedDataToClipboard = () => {
    ImportExportUtils.copyToClipboard(inputTextAreaRef.current);
    copyButtonSuccessBlink();
  };

  return (
    <>
      <div className={`modal fade ${show ? 'show' : ''}`}
        style={{display: show ? 'block' : 'none'}}
        id="export-modal"
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Export</h5>
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
              <div>
                You can copy data from below:
              </div>
              <div className="form-group">
                <textarea className="form-control form-control-sm"
                  rows={6}
                  data-for="export-data"
                  ref={inputTextAreaRef}
                  value={exportValue}
                  onChange={(event) => setExportValue(event.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={() => callback(false)}
              >Cancel</button>
              <button type="button"
                id="export-modal-copy-button"
                className={`btn btn-primary ${copyButtonSucces ? 'btn-success' : ''}`}
                onClick={copySavedDataToClipboard}
              >
                <span>Copy</span>
                <svg className="bi bi-clipboard" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                  <path fillRule="evenodd" d="M9.5 1h-3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
                </svg>
              </button>
              <button type="button"
                id="export-modal-download-button"
                className="btn btn-primary"
                onClick={downloadSavedData}
              >
                <span>Download</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                  <path fillRule="evenodd" d="M7.47 10.78a.75.75 0 001.06 0l3.75-3.75a.75.75 0 00-1.06-1.06L8.75 8.44V1.75a.75.75 0 00-1.5 0v6.69L4.78 5.97a.75.75 0 00-1.06 1.06l3.75 3.75zM3.75 13a.75.75 0 000 1.5h8.5a.75.75 0 000-1.5h-8.5z"></path>
                </svg>
              </button>
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
