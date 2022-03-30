import * as React from 'react';
import {PAGE_TABLE_HEADER_COLUMN} from '../../constants/constants';
import {PageHeaderExpander} from '../pageHeaderExpander/pageHeaderExpander';
import './pageTableHeader.scss';

export const PageTableHeader = () => {
  const tableHeader = Object.values(PAGE_TABLE_HEADER_COLUMN).map(el => <p>{el}</p>);

  return (
    <div className='pageTableHeader'>
      {tableHeader}
      <PageHeaderExpander/>
    </div>
  );
};
