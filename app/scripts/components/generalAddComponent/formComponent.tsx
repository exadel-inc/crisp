import * as React from 'react';
import './formComponent.scss';
import { SelectComponent } from '../selectComponent/selectComponent';
import { InputComponent } from '../inputComponent/inputComponent';
import { AccordionComponent } from '../accordionComponent/accordionComponent';
import { useDispatch, useSelector } from 'react-redux';
import { AddElementActions } from '../../redux/reducers/addElementData/addElementData.actions';
import { MultiselectComponent } from '../multiseleComponent/multiselectComponent';
import {
  ACTIONS_FIELDS_NAME,
  ADD_ACCORDION_FORM_NAME,
  GENERAL_FIELDS_NAME,
  SELECTORS_FIELDS_NAME
} from '../../constants/constants';

export const FormComponent = () => {
  const dispatch = useDispatch();
  const { projects, pages, patterns, elements } = useSelector((stor: any) => stor.storage);

  const addElementData = useSelector((stor: any) => stor.addElementData);

  if(!addElementData) {
    dispatch({
      type: AddElementActions.INIT_DATA,
      payload: {
        data: {
          projectId: projects.length? (projects[0].id || projects[0]._id) : '',
          elementData: {
            pageId: pages.length? (pages[0].id || pages[0]._id): '',
            description: '',
            name: ''
          }
        }
      }
    });
  }

  const setDataToAddElement = (fieldName: string, fieldData: any) => {
    dispatch({
      type: AddElementActions.ADD_ITEM,
      payload: {
        key: fieldName,
        data: fieldData
      }
    });
  };

  const getIdFromElementData = (fieldName: string = '') => {
    if(addElementData?.elementData && fieldName) {
      let data: any = addElementData.elementData;
      const path = fieldName.split('.');
      for(let i=0; i< path.length; ++i) {
        const key = path[i];
        if(!(typeof data === 'object')) break;

        data = data[key];
      }

      return data || '';
    }

    return '';
  };

  const actions = patterns.filter((pattern: any) => pattern.type === 'ACTION');
  const pagePatterns = patterns.filter((pattern: any) => pattern.type === 'PAGE_OBJECT');

  const { PROJECT, PAGE, ELEMENT_DESCRIPTION, ELEMENT_NAME } = GENERAL_FIELDS_NAME;
  const { PAGE_OBJECT_PATTERN, ID, CSS, X_PATH, PARENT_ELEMENT } = SELECTORS_FIELDS_NAME;
  const { ACTION } = ACTIONS_FIELDS_NAME;
  const { GENERAL, SELECTORS, ACTIONS } = ADD_ACCORDION_FORM_NAME;

  return (
    <div className='formComponent'>
      { /* --------------- General accordion --------------- */ }
      <AccordionComponent name={GENERAL} isExpand={true}>
        <SelectComponent name={PROJECT}
          selectedId={addElementData?.projectId}
          optionList={projects}
          required={true}
          onChange={
            (e: any) => {}
          }
        />
        <SelectComponent name={PAGE}
          optionList={pages}
          selectedId={getIdFromElementData('pageId')}
          required={true}
          onChange={
            (e: any) => {
              const value = e.PROJECT? e.PROJECT.value: e.currentTarget.value || '';
              setDataToAddElement('pageId', value);
            }
          }
        />
        <InputComponent name={ELEMENT_DESCRIPTION}
          required={true}
          defaultValue={getIdFromElementData('description')}
          changeAction={
            (e: any) => {
              const value = e.PROJECT? e.PROJECT.value: e.currentTarget.value || '';
              setDataToAddElement('description', value);
            }
          }
        />
        <InputComponent name={ELEMENT_NAME}
          required={true}
          defaultValue={getIdFromElementData('name')}
          changeAction={
            (e: any) => {
              const value = e.PROJECT? e.PROJECT.value: e.currentTarget.value || '';
              setDataToAddElement('name', value);
            }
          }
        />
      </AccordionComponent>
      { /* --------------- Selectors accordion --------------- */ }
      <AccordionComponent name={SELECTORS}>
        <SelectComponent name={PAGE_OBJECT_PATTERN}
          selectedId={getIdFromElementData('pageObjectPattern.id')}
          optionList={pagePatterns}
          onChange={
            (e: any) => {
              const value = e.PROJECT? e.PROJECT.value: e.currentTarget.value || '';
              const id = value;
              const pageObjPattern = pagePatterns.filter(
                (pageObjPattern: any) => pageObjPattern._id === id);
              setDataToAddElement('pageObjectPattern', pageObjPattern);
            }
          }
        />
        <InputComponent name={ID}
          defaultValue={getIdFromElementData('elementId')}
          changeAction={
            (e: any) => {
              const value = e.PROJECT? e.PROJECT.value: e.currentTarget.value || '';
              setDataToAddElement('elementId', value);
            }
          }
        />
        <InputComponent name={CSS}
          defaultValue={getIdFromElementData('elementCss')}
          changeAction={
            (e: any) => {
              const value = e.PROJECT? e.PROJECT.value: e.currentTarget.value || '';
              setDataToAddElement('elementCss', value);
            }
          }
        />
        <InputComponent name={X_PATH}
          defaultValue={getIdFromElementData('elementXPath')}
          changeAction={
            (e: any) => {
              const value = e.PROJECT? e.PROJECT.value: e.currentTarget.value || '';
              setDataToAddElement('elementXPath', value);
            }
          }
        />
        <SelectComponent name={PARENT_ELEMENT}
          selectedId={getIdFromElementData('parentElementId')}
          optionList={elements}
          onChange={
            (e: any) => {
              const value = e.PROJECT? e.PROJECT.value: e.currentTarget.value || '';
              setDataToAddElement('parentElementId', value);
            }
          }
        />
      </AccordionComponent>
      { /* --------------- Actions accordion --------------- */ }
      <AccordionComponent name={ACTIONS}>
        <MultiselectComponent
          elPatterns={getIdFromElementData('actionPatterns') || []}
          onChangeMultiselect={(newActions: any) => {
            setDataToAddElement('actionPatterns', newActions);
          }}></MultiselectComponent>
      </AccordionComponent>
    </div>
  );
};
