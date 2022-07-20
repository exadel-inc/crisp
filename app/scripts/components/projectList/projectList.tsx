import * as React from 'react';
import {projectsListMoc} from '../../constants/moc';
import {ProjectComponent} from '../projectComponent/projectComponent';
import './projectList.scss';

export const ProjectList = () => {
  // @ts-ignore
  const projectsData = JSON.parse(localStorage.getItem('projects'));
  let projectContent = 'Project list is empty';

  if (projectsData && projectsData.length > 0) {
    projectContent = projectsData.map(
      // @ts-ignore
      (el, index) => {
        const {name, _id} = el;

        return <ProjectComponent key={_id} counter={index + 1} name={name} projectId={_id}/>;
      }
    );
  }

  return (
    <div className='projectList'>
      {projectContent}
    </div>
  );
};
