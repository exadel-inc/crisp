import * as React from 'react';
import { useEffect, useState } from 'react';
import { Pattern } from '../../patterns/pattern';
import { ActionListItem, CustomVars } from './action-list.interface';
import { CustomPatternVariables } from './custom-pattern-variables.component';

/**
 * Pattern list item component
 * @param pattern {Pattern} Pattern
 * @param isChecked {boolean} is pattern checked
 * @param customVars {CustomVars} custom variables with values
 * @param onSelect {Function} a callback function to be called on list item select
 * @param onCustomVarChange {Function} a callback function to be called on custom variable change
*/
export function ActionPatternListItem ({ pattern, isChecked, customVars, onSelect, onCustomVarChange}: {
  pattern: Pattern,
  isChecked: boolean,
  customVars: CustomVars,
  onSelect: (actionPattern: ActionListItem, customVars: CustomVars) => void,
  onCustomVarChange: (data: CustomVars) => void,
}): JSX.Element {
  /**
   * Component state: list item custom var section collapsed
  */
  const [collapsed, setCollapsed] = useState(true);
  /**
   * Collapse custom vars section on unselect
  */
  useEffect(() => {
    if (!isChecked) {
      setCollapsed(!isChecked);
    }
  }, [isChecked]);

  /**
   * Function called on list item select
   * @param event {ChangeEvent} change event
   * @param isChecked {boolean} checked state
  */
  const handleItemCheck = (event: React.ChangeEvent<HTMLInputElement>, isChecked: boolean) => {
    event.stopPropagation();
    onSelect({pattern, checked: isChecked}, customVars);
  }

  /**
   * Function called on list item custom variables change
   * @param data {CustomVars} custom variables data
  */
  const handleItemCustomVarsChange = (data: CustomVars) => {
    onCustomVarChange(data)
  }

  /**
   * Function called on collapse button click
   * @param event {MouseEvent} click event
  */
  const handleCollapseButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    setCollapsed(!collapsed);
  }

  /**
   * pattern custom variable names
  */
  const patternVarNames: string[] = pattern.getVarNames(true);

  /**
   * possibility to expand the section
  */
  const expandable: boolean = patternVarNames.length > 0;

  /**
   * Expand button template
  */
  let expandBtnTemplate = null;

  /**
   * custom variables template
  */
  let variablesTemplate = null;

  if (expandable) {
    expandBtnTemplate = (
      <button className="btn btn-white btn-sm btn-pattern-expand"
        data-toggle="collapse"
        data-target={pattern.id}
        onClick={(event) => handleCollapseButtonClick(event)}
      >
        <span className="icon-expand"></span>
      </button>
    );
    variablesTemplate = (
      <div className={`${collapsed ? 'collapse' : ''} pt-2`}
        id={pattern.id}
        data-pattern-id={pattern.id}
      >
        <CustomPatternVariables
          patternId={pattern.id}
          patternVarNames={patternVarNames}
          customVars={customVars}
          showValue={isChecked}
          onChange={(data: CustomVars) => handleItemCustomVarsChange(data)}
        />
      </div>
    );
  }

  return (
    <li className="list-group-item py-1">
      <div className="form-check d-flex justify-content-between pattern-item">
        <input className="form-check-input"
          checked={isChecked}
          type="checkbox"
          onChange={(event) => handleItemCheck(event, !isChecked)}
        />
        <label className="form-check-label">{pattern.name}</label>
        {expandBtnTemplate}
      </div>
      {variablesTemplate}
    </li>
  );

};
