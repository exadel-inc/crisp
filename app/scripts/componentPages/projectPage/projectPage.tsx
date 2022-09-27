import * as React from 'react';

import {ProjectList} from '../../components/projectList/projectList';
import {ProjectPageHeader} from '../../components/projectPageHeader/projectPageHeader';
import {PageBar} from '../../components/pageBar/pageBar';
import { GenerateScriptTab } from '../../components/generateScriptTab/generateScriptTab';

export const ProjectPage = () => {
  return (
    <>
      <ProjectPageHeader/>
      <PageBar/>
      <div className='projectPage'>
        <ProjectList/>
        <GenerateScriptTab/>
      </div>
    </>
  );
};
