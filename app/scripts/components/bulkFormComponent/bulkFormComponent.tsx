import * as React from 'react';
import {SelectComponent} from '../selectComponent/selectComponent';
import './bulkFormComponent.scss';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { InputComponent } from '../inputComponent/inputComponent';
import { PatternType } from '../../patterns/pattern-interface';
import { GENERAL_FIELDS_NAME } from '../../constants/constants';

export const BulkFormComponent = () => {
  const {PAGE, PAGE_OBJECT} = GENERAL_FIELDS_NAME;
  let selectedProjectId = useSelector((storage: RootState) => storage.selectedProjectId );
  const project: any = useSelector((storage: RootState) => storage.storage.projects.find((project: any) => {
      return project.id === selectedProjectId || project._id === selectedProjectId;
    }) || (storage.storage.projects.length ? storage.storage.projects[0] : undefined )
  );
  if(!selectedProjectId && project) {
    selectedProjectId = project._id || project.id
  }
  const frameworkId = project.framework;
  
  const pages: any = useSelector((store: RootState) => store.storage.pages.filter((page: any) => {
    return page.project === selectedProjectId;
  })) || [];
  const patterns: any = useSelector((store: RootState) => store.storage.patterns.filter((pattern: any) => {
    return pattern.type === PatternType.PAGE_OBJECT && pattern.framework === frameworkId;
  })) || [];

  // <SelectComponent name={PROJECT} optionList={projectsListMoc} required={true}/>
  // <SelectComponent name={ATTRIBUTE} optionList={projectsListMoc} required={true}/>
  return (
    <div className='bulkFormComponent'>
      <SelectComponent name={PAGE} optionList={pages} required={true}/>
      <SelectComponent name={PAGE_OBJECT} optionList={patterns} required={true}/>
      <InputComponent name={'ATTRIBUTE'} required={true} />
    </div>
  );
};
