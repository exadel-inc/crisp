import * as React from 'react';
import {PLACEHOLDER_INPUT} from '../../constants/constants';
import './inputComponent.scss';

export const InputComponent = ({name, required = false}: { name: string; required?: boolean }) => {
  return (
    <div className='inputWrapper'>
      <label className='inputLabel' htmlFor={name}>{name}{required && <span className='required'>*</span>} </label>
      <input
        className='inputField'
        name={name}
        placeholder={`${PLACEHOLDER_INPUT.FIRST_PART} ${name.toLowerCase()} ${PLACEHOLDER_INPUT.SECOND_PART}`}
        required={required}/>
    </div>
  );
};
