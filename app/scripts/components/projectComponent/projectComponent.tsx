import React from 'react';
import {ProjectPanel} from '../projectPanel/projectPanel';
import {PillList} from '../pillList/pillList';
import {AddPageButton} from '../addPageButton/addPageButton';


export const ProjectComponent = () => {
  return (
    <>
      <ProjectPanel counter='2' projectName='adscd'/>
      <PillList/>
      <AddPageButton/>
    </>
  );
};
