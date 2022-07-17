import * as React from 'react';

import {ProjectList} from '../../components/projectList/projectList';

import {ProjectPageHeader} from '../../components/projectPageHeader/projectPageHeader';
import {TextComponent} from '../../components/textComponent/textComponent';
import {PageBar} from '../../components/pageBar/pageBar';

export const ProjectPage = () => {
  return (
      <>
        <ProjectPageHeader/>
        <PageBar selectedCount={2}/>
        <div className='projectPage'>
          <ProjectList/>
          <TextComponent/>
        </div>
      </>
  );
};
