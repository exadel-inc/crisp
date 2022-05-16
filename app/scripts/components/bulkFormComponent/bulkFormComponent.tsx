import * as React from 'react';
import {SelectComponent} from '../selectComponent/selectComponent';
import {projectsListMoc} from '../../constants/moc';
import {GENERAL_FIELDS_NAME} from '../../constants/constants';
import './bulkFormComponent.scss';

export const BulkFormComponent = () => {
  const {PROJECT, PAGE, PAGE_OBJECT, ATTRIBUTE} = GENERAL_FIELDS_NAME;

  return (
    <div className='bulkFormComponent'>
      <SelectComponent name={PROJECT} optionList={projectsListMoc} required={true}/>
      <SelectComponent name={PAGE} optionList={projectsListMoc} required={true}/>
      <SelectComponent name={PAGE_OBJECT} optionList={projectsListMoc} required={true}/>
      <SelectComponent name={ATTRIBUTE} optionList={projectsListMoc} required={true}/>
    </div>
  );
};
