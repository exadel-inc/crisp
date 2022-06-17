import * as React from 'react';
import './formComponent.scss';
import {SelectComponent} from '../selectComponent/selectComponent';
import {projectsListMoc} from '../../constants/moc';
import {InputComponent} from '../inputComponent/inputComponent';
import {
  ACTIONS_FIELDS_NAME,
  ADD_ACCORDION_FORM_NAME,
  GENERAL_FIELDS_NAME,
  SELECTORS_FIELDS_NAME
} from '../../constants/constants';
import {AccordionComponent} from '../accordionComponent/accordionComponent';

export const FormComponent = () => {
  const {PROJECT, PAGE, ELEMENT_DESCRIPTION, ELEMENT_NAME} = GENERAL_FIELDS_NAME;
  const {PAGE_OBJECT_PATTERN, ID, CSS, X_PATH, PARENT_ELEMENT} = SELECTORS_FIELDS_NAME;
  const {ACTION} = ACTIONS_FIELDS_NAME;
  const {GENERAL, SELECTORS, ACTIONS} = ADD_ACCORDION_FORM_NAME;

  return (
    <div className='formComponent'>
      <AccordionComponent name={GENERAL}>
        <SelectComponent name={PROJECT} optionList={projectsListMoc} required={true}/>
        <SelectComponent name={PAGE} optionList={projectsListMoc} required={true}/>
        <InputComponent name={ELEMENT_DESCRIPTION} required={true}/>
        <InputComponent name={ELEMENT_NAME}/>
      </AccordionComponent>
      <AccordionComponent name={SELECTORS}>
        <SelectComponent name={PAGE_OBJECT_PATTERN} optionList={projectsListMoc}/>
        <InputComponent name={ID}/>
        <InputComponent name={CSS}/>
        <InputComponent name={X_PATH}/>
        <SelectComponent name={PARENT_ELEMENT} optionList={projectsListMoc}/>
      </AccordionComponent>
      <AccordionComponent name={ACTIONS}>
        <SelectComponent name={ACTION} optionList={projectsListMoc}/>
      </AccordionComponent>
    </div>
  );
};
