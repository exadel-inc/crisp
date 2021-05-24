import * as React from 'react';

export interface SelectOption {
  name: string;
  id: string;
}

export interface SelectSettings {
  required?: boolean;
  firstOption?: {
    label: string;
    enabled?: boolean;
  };
  label?: {
    label: string;
    className?: string;
  }; 
  id?: string;
  className?: string;
}

/**
 * Create common select element
 * @param value {string} default value
 * @param options {SelectOption[]} optins list
 * @param onChange {Function} function to be fired on list change
 * @param settings {SelectSettings} additional settings
*/
export const Select = ({value, options, settings, onChange}: {
  value: string | undefined;
  options: SelectOption[] | undefined;
  onChange: (option: SelectOption | null) => void;
  settings?: SelectSettings;
}) => {

  /**
   * Create JSX.Element element of options to insert into list
   * @param option {SelectOption} pattern
  */
  const optionListItem = (option: SelectOption): JSX.Element => {
    return <option key={option.id} value={option.id}>{option.name}</option>;
  };

  /**
   * Create JSX.Element of label
  */
  const label = settings?.label
    ? <label className={settings?.label?.className}>{settings?.label?.label}</label>
    : null;

  /**
   * Create JSX.Element of first item in list
  */
  const firstOption = settings?.firstOption
    ? <option disabled={!settings?.firstOption?.enabled} value=''>{settings?.firstOption?.label}</option>
    : null;

  const handleSelectChange = (optionId: string): void => {
    const option = (options || []).find(option => option.id === optionId);
    if (option) {
      onChange(option);
    } else {
      onChange(null);
    }
  };

  return (
    <>
      {label}
      <select id={settings?.id}
        required={settings?.required}
        className={`form-control ${settings?.className}`}
        value={value}
        onChange={(event) => handleSelectChange(event.target.value)}
      >
        {firstOption}
        {(options || []).map((option: SelectOption) => optionListItem(option))}
      </select>
    </>
  );
};