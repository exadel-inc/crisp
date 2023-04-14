import * as React from 'react';
import './selectComponent.scss';

export const SelectComponent = ({
  optionList,
  selectedId = '',
  name,
  formName = '',
  label = '',
  required=false,
  disabled = false,
  defaultValue = '',
  onChange
}: {
  optionList: any[]; name: string; required?: boolean;
  label?: string;
  selectedId?: string;
  disabled?: boolean;
  defaultValue?: string;
  formName?: string;
  onChange?: Function;
}) => {

  const options = (selectedId: string) => optionList.map((item: any, index: number) => {
    return typeof item === 'string' ? <option key={item} value={item}>{item}</option> :
      <option key={`option-${item._id}-${index}`} value={item._id}>{item.name}</option>;
  });

  let selectAttr = {};

  if(onChange) selectAttr = {...selectAttr, onChange: onChange};

  return (
    <div className='selectWrapper'>
      <div className='selectName'>
        {label || name}{required &&<span className='required'>*</span>}
      </div>
      <select {...selectAttr} name={formName} className='select' disabled={disabled} defaultValue={selectedId}>
        {options(selectedId)}
      </select>
    </div>
  );
};
