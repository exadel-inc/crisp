import * as React from 'react';
import {EditComponent} from '../editComponent/editComponent';
import {Expander} from '../expander/expander';
import {DeleteComponent} from '../deletComponent/deleteComponent';
import {DEFAULT_PROJECT_PANEL_COUNT, DEFAULT_PROJECT_PANEL_NAME} from '../../constants/constants';
import './projectPanel.scss';

export const ProjectPanel = ({
                               counter = DEFAULT_PROJECT_PANEL_COUNT,
                               projectName = DEFAULT_PROJECT_PANEL_NAME
                             }: {
  counter: string;
  projectName: string;
}) => {
  return (
    <div className='projectPanelWrapper'>
      <div>
        <p>{counter}.</p>
        <p className='projectName'>{projectName}</p>
      </div>
      <div className='controlWrapper'>
        <EditComponent/>
        <DeleteComponent/>
        <Expander/>
      </div>
    </div>
  );
};