import * as React from 'react';
import {breadcrambsMoc} from '../../constants/moc';
import {HelpIcon} from '../helpIcon/helpIcon';
import {SortSelector} from '../sortSelector/sortSelector';
import './projectPageHeader.scss';
import {Breadcrumb} from '../breadcrumbs/breadcrumb';

export const ProjectPageHeader = () => {

  return (
    <div className='projectHeader'>
      <div>
        <Breadcrumb crumbs={breadcrambsMoc} selected={() => {
        }}/>
      </div>
      <div>
        <SortSelector/>
        <HelpIcon/>
      </div>
    </div>
  );
};
