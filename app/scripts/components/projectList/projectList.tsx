import * as React from 'react';
import {projectsListMoc} from '../../constants/moc';
import {ProjectComponent} from '../projectComponent/projectComponent';
import './projectList.scss';

export const ProjectList = () => {
  const projectsList = projectsListMoc.map(
    (el, index) => <ProjectComponent key={index + el} counter={index} projectName={el}/>
  );

  return (
    <div className='projectList'>
      {projectsList}
    </div>
  );
};
