import * as React from 'react';
import {PLACEHOLDER_INPUT} from '../../constants/constants';
import './inputComponent.scss';

export const InputComponent = ({
  name, label='', placeholder='',
  defaultValue = '', value = '', required = false,
  changeAction = undefined,
  disabled = false,
  formName = ''}: {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  changeAction?: Function | undefined;
  value?: string;
  disabled?: boolean;
  defaultValue?: string;
  formName?: string;
}) => {
  let inputProps: any = {};

  if(changeAction) {
    inputProps.onChange = (event: any) => {
      changeAction(event);
    };
  }
  if(value) {
    inputProps.value = value;
  } else if(defaultValue) {
    inputProps.defaultValue = defaultValue;
  }

  return (
    <div className='inputWrapper'>
      <label className='inputLabel' htmlFor={name}>{label || name}{required && <span className='required'>*</span>} </label>
      <input
        {...inputProps}
        className='inputField'
        id={name}
        name={formName}
        disabled={disabled}
        placeholder={`${PLACEHOLDER_INPUT.FIRST_PART} ${placeholder || name.toLowerCase()} ${PLACEHOLDER_INPUT.SECOND_PART}`}
        required={required}/>
    </div>
  );
};
