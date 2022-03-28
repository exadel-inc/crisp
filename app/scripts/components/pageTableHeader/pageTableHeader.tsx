import * as React from 'react';
import {PAGE_TABLE_HEADER_COLUMN} from '../../constants/constants';


export const PageTableHeader = () => {
  const {ELEMENT, PATTERN, PARAMETER, ACTIONS} = PAGE_TABLE_HEADER_COLUMN;

  return (
    <div>
      <p>{ELEMENT}</p>
      <p>{PATTERN}</p>
      <p>{PARAMETER}</p>
      <p>{ACTIONS}</p>
    </div>
  );
};
