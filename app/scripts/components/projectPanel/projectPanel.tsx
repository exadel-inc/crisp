import * as React from 'react';
import {useContext} from 'react';
import {EditComponent} from '../editComponent/editComponent';
import {Expander} from '../expander/expander';
import {useSelector} from 'react-redux';
import {DeleteComponent} from '../deletComponent/deleteComponent';
import {DEFAULT_PROJECT_PANEL_COUNT, DEFAULT_PROJECT_PANEL_NAME} from '../../constants/constants';
import {IsOpenProject} from '../projectComponent/projectComponent';
import './projectPanel.scss';

export const ProjectPanel = ({
                               counter = DEFAULT_PROJECT_PANEL_COUNT,
                               projectName = DEFAULT_PROJECT_PANEL_NAME,
                             }: {
  counter: number;
  projectName: string;
}) => {
  const {isOpen, changeState} = useContext(IsOpenProject);
  // @ts-ignore
  const {appMode} = useSelector(state => state);

  return (
    <div className='projectPanelWrapper'>
      <div>
        <p>{counter}.</p>
        <p className='projectName'
           onClick={changeState}>
          {projectName}</p>
      </div>
      <div className='controlWrapper'>
        {appMode === appMode.ADMIN &&
          <>
            <EditComponent/>
            <DeleteComponent style=''/>
          </>}
        <Expander changeState={changeState} isOpen={isOpen}/>
      </div>
    </div>
  );
};
