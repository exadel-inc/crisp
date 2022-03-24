import * as React from 'react';
import {BigButton} from '../bigButton/bigButton';
import {ADD_PROJECT_BUTTON_NAME} from '../../constants/constants';
import {ProjectList} from '../projectList/projectList';

export const ProjectPage = () => {
  return (
    <div className='projectPage'>
      <ProjectList/>
      <div className='buttonWrapper'>
        <BigButton buttonName={ADD_PROJECT_BUTTON_NAME} disable={true}/>
      </div>
    </div>
  );
};
