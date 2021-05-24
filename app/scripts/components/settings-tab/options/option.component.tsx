import * as React from 'react';

type Props = {
  optionId: string;
  optionName: string;
  isDefault?: boolean;
  isRadio?: boolean;
  onEdit: React.ReactEventHandler;
  onDuplicate: React.ReactEventHandler;
  onRemove: React.ReactEventHandler;
  onChangeDefault: React.ReactEventHandler;
};

export function SettingsOption(props: Props) {

  const {
    optionId,
    optionName,
    isDefault = false,
    isRadio = false,
    onEdit,
    onDuplicate,
    onRemove,
    onChangeDefault
  } = props;

  const renderRadio = () => (
    <span>&nbsp;
      <input className="form-check-input option-btn-set-default"
        type="radio"
        data-key={optionId}
        id={optionId}
        value={optionId}
        checked={isDefault}
        onChange={onChangeDefault}
      />
    </span>
  );

  return (
    <li className="list-group-item py-1 d-flex justify-content-between align-items-center">
      <span>
        { isRadio && renderRadio() }
        <span className="option-title">{optionName}</span>
      </span>
      <div className="btn-group">
        <button
          type="button"
          className="btn btn-white btn-sm option-btn-edit"
          onClick={onEdit}
        >
          <span className="option-btn-icon"></span>
        </button>
        <button
          type="button"
          className="btn btn-white btn-sm option-btn-duplicate"
          onClick={onDuplicate}
        >
          <span className="option-btn-icon"></span>
        </button>
        <button
          type="button"
          className="btn btn-white btn-sm option-btn-remove"
          onClick={onRemove}
        >
          <span className="option-btn-icon"></span>
        </button>
      </div>
    </li>
  );
}