import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HideAction } from '../../../redux/reducers/confirm-modal/confirm-modal.actions';
import { RootState } from '../../../redux/store';


const selector = (state: RootState) => state.modal.confirmModal;
/**
 * Confirmation Modal
 */
export const ConfirmModal: React.FunctionComponent = () => {

  const dispatch = useDispatch();

  const { title, message, show, onConfirm, onCancel } = useSelector(selector);

  const style = {
    display: show && 'block' || 'none',
  };

  const callback = (confirm: boolean) => {
    dispatch({...new HideAction()});
    if (confirm) {
      onConfirm?.();
    } else {
      onCancel?.();
    }
  };

  return (
    <>
      <div style={style} className={`modal fade ${show ? 'show' : ''}`}
        id="commonConfirmModal"
        tabIndex={-1}
        aria-labelledby="commonConfirmModalLabel"
        aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="commonConfirmModalLabel">{title}</h5>
              <button type="button" className="close" aria-label="Close" onClick={() => callback(false)}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">{message}</div>
            <div className="modal-footer">
              <button type="button" onClick={() => callback(false)} className="btn btn-secondary modal-cancel-button">Cancel</button>
              <button type="button" onClick={() => callback(true)} className="btn btn-primary modal-accept-button">OK</button>
            </div>
          </div>
        </div>
      </div>
      <div style={style} className={`modal-backdrop fade ${show ? 'show' : ''}`}></div>
    </>
  );
};
