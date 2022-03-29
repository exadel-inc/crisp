import * as React from 'react';
import {SORT_LABEL} from '../../constants/constants';
import './sortSelector.scss';

export const SortSelector = () => {
  return (
    <label className='projectSort'>
      {SORT_LABEL}
      <select>
        <option>newest</option>
        <option>oldest</option>
      </select>
    </label>
  );
};
