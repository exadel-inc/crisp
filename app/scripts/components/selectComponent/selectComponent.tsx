import * as React from 'react';
import './selectComponent.scss';

export const SelectComponent = ({
                                  optionList,
                                  name,
                                  required=false
                                }: { optionList: string[]; name: string; required?: boolean }) => {

  const options = optionList
    .map(name => <option key={name} value={name}>{name}</option>);

  return (
    <div className='selectWrapper'>
      <div className='selectName'>
        {name}{required &&<span className='required'>*</span>}
      </div>
      <select className='select'>
        {options}
      </select>
    </div>
  );
};
