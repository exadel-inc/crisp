import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HideAction } from '../../../redux/reducers/import-type-modal/import-type-modal.actions';
import { RootState } from '../../../redux/store';

const selector = (state: RootState) => state.modal.importTypeModal;
/**
 * Import Type Confirmation Modal
 */
export const ImportTypeConfirmationModal = () => {

  const dispatch = useDispatch();

  const { show, onMerge, onOverride, onCancel } = useSelector(selector);

  const closeModal = () => {
    dispatch({...new HideAction()});
    onCancel?.();
  }

  const handleMerge = () => {
    dispatch({...new HideAction()});
    onMerge?.();
  }

  const handleOverride = () => {
    dispatch({...new HideAction()});
    onOverride?.();
  }

  return (
    <>
      <div className={`modal fade ${show ? 'show' : ''}`}
        style={{display: show ? 'block' : 'none'}}
        id="import-type-modal"
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title modal-header">Import</h5>
              <button type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={closeModal}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <div className="row">
                  <div className="col-12">
                    <p className="modal-description">Please choose import type:</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button"
                id="import-type-modal-merge-button"
                className="btn btn-primary"
                onClick={handleMerge}
              >Merge</button>
              <button type="button"
                id="import-type-modal-override-button"
                className="btn btn-primary"
                onClick={handleOverride}
              >Override</button>
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
