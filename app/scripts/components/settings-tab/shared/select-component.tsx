import * as React from 'react';
import { ISelectOption } from './interfaces';

interface ISelectProps extends React.SelectHTMLAttributes<any> {
  options: ISelectOption[];
}

export function SelectComponent (props: ISelectProps) {

  /**
   * Render options of the Select HTML element
   * @param options {ISelectOption}
   */
  const renderSelectOptions = (options: ISelectOption[]) => {
    return options.map( (option) =>
      <option value={option.value} key={option.value}>{option.text}</option> );
  };

  return (
    <select
      className={props.className}
      value={props.value}
      onChange={props.onChange}
      disabled={!!props.disabled}
    >
      {renderSelectOptions(props.options)}
    </select>
  );
}
