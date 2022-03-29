import * as React from 'react';
import {projectsListMoc} from '../../constants/moc';
import {COUNT_PROJECT_TITLE, SORT_LABEL} from '../../constants/constants';
import {HelpIcon} from '../helpIcon/helpIcon';
import {SortSelector} from '../sortSelector/sortSelector';
import './projectPageHeader.scss';

export const ProjectPageHeader = () => {
  const getTitle = (projectsList: any []) => {
    const listLength = projectsList.length;
    return listLength > 1 ? `${COUNT_PROJECT_TITLE}s` : `${COUNT_PROJECT_TITLE}`;
  };

  return (
    <div className='projectHeader'>
      <p>{projectsListMoc.length} <b>{getTitle(projectsListMoc)}</b></p>
      <div>
        <SortSelector/>
        <HelpIcon/>
      </div>
    </div>
  );
};
