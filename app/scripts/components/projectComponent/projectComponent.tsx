import React from 'react';
import {ProjectPanel} from '../projectPanel/projectPanel';
import {PillList} from '../pillList/pillList';


export const ProjectComponent = () => {
  return (<>
      <ProjectPanel counter='2' projectName='adscd'/>
      <PillList/>
    </>
  );
};
