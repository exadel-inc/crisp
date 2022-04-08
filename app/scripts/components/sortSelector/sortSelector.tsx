import * as React from 'react';
import {SORT_LABEL, SORT_TYPES} from '../../constants/constants';
import './sortSelector.scss';

export const SortSelector = () => {
  const options = Object.values(SORT_TYPES).map(option => <option value={option}>{option}</option>);

  return (
    <label className='projectSort'>
      {SORT_LABEL}
      <select>
        {options}
      </select>
    </label>
  );
};
