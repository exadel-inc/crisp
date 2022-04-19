import * as React from 'react';
import './breadcrumb.scss';
import {projectsListMoc} from '../../constants/moc';
import {BREAD_CRUMB_SEPARATOR, COUNT_PROJECT_TITLE} from '../../constants/constants';

export const Breadcrumb = ({crumbs, selected}: { crumbs: string[]; selected: (crumb: string) => void }) => {
  const isLastCrumb = (index: number) => index === crumbs.length - 1;

  const getTitle = (projectsList: any []) => {
    const listLength = projectsList.length;
    return listLength > 1 ? `${COUNT_PROJECT_TITLE}s` : `${COUNT_PROJECT_TITLE}`;
  };

  const crumbsArray = crumbs.map((crumb, index) => {
    return (
      <li key={index}>
        <button
          className={`breadcrumbButton ${isLastCrumb(index) && 'breadcrumbLast'}`}
          onClick={() => selected(crumb)}
          disabled={isLastCrumb(index)}>
          {crumb}
        </button>
        {!isLastCrumb(index) && <span> {' >'}</span>}
      </li>
    );
  });

  return (
    <nav className='breadcrumbs'>
      <ol>
        <li>
          <span>{projectsListMoc.length}</span>
          <button className='breadcrumbButton'>
            <b>{getTitle(projectsListMoc)}</b></button>
          <span> {BREAD_CRUMB_SEPARATOR}</span>
        </li>
        {crumbsArray}
      </ol>
    </nav>
  );
};
