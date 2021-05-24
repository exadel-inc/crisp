import * as React from 'react';
import { useEffect, useState } from 'react';
import { CustomVars } from './action-list.interface';

/**
 * Custom variables component
 * @param patternId {string} Pattern id
 * @param patternVarNames {string[]} variable names
 * @param customVars {CustomVars} custom variables with values
 * @param showValue {boolean} display custom variable value
 * @param onChange {Function} a callback function to be called on custom variable change
*/
export function CustomPatternVariables ({patternId, patternVarNames, customVars, showValue, onChange}: {
  patternId: string,
  patternVarNames: string[],
  customVars: CustomVars,
  showValue: boolean,
  onChange: (data: CustomVars) => void
}): JSX.Element {

  /**
   * Returns the customVar value of current action pattern
   * @param varName {string} name of custom variable
  */
  const getCustomVar = (varName: string): string | undefined => {
    return customVars[varName] || '';
  }

  /**
   * Function called on action pattern custom variables change
   * @param varName {string} custom variable name (key)
   * @param value {string} custom variables value
  */
  const handleCustomVarChange = (varName: string, value: string) => {
    onChange({[varName]: value})
  }

  return (
    <>{
      patternVarNames.map((varName: string) => {
        /**
         * Component state: custom var value
        */
        const [value, setValue] = useState(showValue ? getCustomVar(varName) : '');

        /**
         * Reset custom var value on each list item check
        */
        useEffect(() => setValue(showValue ? getCustomVar(varName) : ''), [showValue, customVars]);

        /**
         * Function called on custom variable change
         * @param inputValue {string} custom variable value
        */
        const handleValueChange = (inputValue: string) => {
          const newValue = showValue ? inputValue : '';
          setValue(newValue);
          handleCustomVarChange(varName, newValue);
        }

        return (
          <div className="input-group input-group-sm" key={`${patternId}-${varName}`}>
            <div className="input-group-prepend">
              <span className="input-group-text">{varName}</span>
            </div>
            <input data-var-name={varName}
              type="text"
              className="form-control pattern-var-input"
              value={value}
              onChange={(event) => handleValueChange(event.target.value)}
            />
          </div>
        );
      })
    }</>
  );
};
