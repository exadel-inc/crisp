import * as React from 'react';
import './generalAddComponent.scss';
import {SelectComponent} from '../selectComponent/selectComponent';
import {projectsListMoc} from '../../constants/moc';
import {InputComponent} from '../inputComponent/inputComponent';
import {GENERAL_FIELDS_NAME} from '../../constants/constants';

export const GeneralAddComponent = () => {
  const {PROJECT, PAGE, ELEMENT_DESCRIPTION, ELEMENT_NAME} = GENERAL_FIELDS_NAME;

  return (
    <div className='generalAddComponent'>
      <SelectComponent name={PROJECT} optionList={projectsListMoc} required={true}/>
      <SelectComponent name={PAGE} optionList={projectsListMoc} required={true}/>
      <InputComponent name={ELEMENT_DESCRIPTION} required={true}/>
      <InputComponent name={ELEMENT_NAME} required={false}/>
    </div>
  );
};
