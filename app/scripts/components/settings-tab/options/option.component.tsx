import * as React from 'react';
import { DeleteComponent } from '../../deletComponent/deleteComponent';
import { EditComponent } from '../../editComponent/editComponent';

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
    // optionId,
    optionName,
    // isDefault = false,
    // isRadio = false,
    onEdit,
    // onDuplicate,
    onRemove
    // , onChangeDefault
  } = props;

  return (
    <li className="list-group-item py-1 d-flex justify-content-between align-items-center">
      <span>
        <span className="option-title">{optionName}</span>
      </span>
      <div className="btn-group">
        <EditComponent clickAction={onEdit} />
        <DeleteComponent clickAction={onRemove} />
      </div>
    </li>
  );
}