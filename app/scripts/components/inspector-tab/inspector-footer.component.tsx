import * as React from 'react';

export enum InspectorFooterButtonType {
  SAVE = 'save',
  SAVE_AND_ADD_NEW = 'saveAndAddNew',
  CANCEL = 'cancel',
}

/**
 * Inspector footer with buttons
 * @param isEditMode {boolean} inspector mode: edit element or add new one
 * @param onButtonClick {Function} function called on any button click, takes button type as a param
 */
export function InspectorFooter ({ isEditMode, onButtonClick }: {
  isEditMode: boolean;
  onButtonClick: (buttonType: InspectorFooterButtonType) => void;
}) {

  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col justify-content-center d-flex">
            <button type="button"
              id="inspector-btn-save"
              className="btn btn-sm btn-primary btn-block"
              onClick={() => onButtonClick(InspectorFooterButtonType.SAVE)}
            >Save</button>
          </div>
          <div className={`col justify-content-center ${isEditMode ? 'd-none' : 'd-flex'}`}>
            <button type="button"
              id="inspector-btn-save-add"
              className="btn btn-sm btn-primary btn-block"
              onClick={() => onButtonClick(InspectorFooterButtonType.SAVE_AND_ADD_NEW)}
            >Save & Add New</button>
          </div>
          <div className={`col justify-content-center ${isEditMode ? 'd-flex' : 'd-none'}`}>
            <button type="button"
              id="inspector-btn-cancel"
              className="btn btn-sm btn-secondary btn-block"
              onClick={() => onButtonClick(InspectorFooterButtonType.CANCEL)}
            >Cancel</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
