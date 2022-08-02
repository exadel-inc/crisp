import * as React from 'react';
import {ProjectComponent} from '../projectComponent/projectComponent';
import './projectList.scss';
import {useSelector} from 'react-redux';

export const ProjectList = () => {
  // @ts-ignore
  const {storage:{projects}} = useSelector(state => state);
  let projectContent = 'Project list is empty';

  if (projects && projects.length > 0) {
    projectContent = projects.map(
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
