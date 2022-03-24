import * as React from 'react';
import {ProjectComponent} from '../projectComponent/projectComponent';
import {BigButton} from '../bigButton/bigButton';
import {ADD_PROJECT_BUTTON_NAME} from '../../constants/constants';

export const ProjectPage = () => {
  return (
    <div>
      <ProjectComponent/>
      <div className='buttonWrapper'>
        <BigButton buttonName={ADD_PROJECT_BUTTON_NAME} disable={true}/>
      </div>
    </div>
  );
};
