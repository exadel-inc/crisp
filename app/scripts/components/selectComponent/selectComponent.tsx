import * as React from 'react';
import './selectComponent.scss';

export const SelectComponent = ({
                                  optionList,
                                  selectedId = '',
                                  name,
                                  formName = '',
                                  required=false,
                                  disabled = false,
                                  defaultValue = ''
                                }: {
                                  optionList: any[]; name: string; required?: boolean;
                                  selectedId?: string; disabled?: boolean;
                                  defaultValue?: string; formName?: string  }) => {

  const options = (selectedId: string) => optionList
    .map((item:any,index: number) => {
      return typeof item === 'string' ? <option key={item} value={item}>{item}</option> :
      <option key={`option-${item._id}-${index}`} value={item._id}>{item.name}</option>
    });

  return (
    <div className='selectWrapper'>
      <div className='selectName'>
        {name}{required &&<span className='required'>*</span>}
      </div>
      <select name={formName} className='select' disabled={disabled} defaultValue={selectedId}>
        {options(selectedId)}
      </select>
    </div>
  );
};
