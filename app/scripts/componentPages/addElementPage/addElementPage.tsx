import * as React from 'react';
import { useSelector } from 'react-redux';
import { FormComponent } from '../../components/generalAddComponent/formComponent';
import { BigButton } from '../../components/bigButton/bigButton';
import { BUTTON_NAME_ADD, PAGE_TITLE_NAME } from '../../constants/constants';
import { PageTitle } from '../../components/pageTitle/pageTitle';
import './addElementPage.scss';
import store from '../../redux/store';
import { useConfirmModal } from '../../components/shared/confirm-modal/confirm-modal';
import { restApi } from '../../serverRestApi';
import { showToast } from '../../components/shared/toasts-component';
import { ActionTypes } from '../../redux/reducers/storage/storage.actions';

const elementsRest = restApi('elements');

export const AddElementPage = () => {
  const showConfirmModal = useConfirmModal();
  const addElementData = useSelector((stor: any) => stor.addElementData);
  const {ADD_ELEMENT} = PAGE_TITLE_NAME;

  return (
      <div>
        <PageTitle title={ADD_ELEMENT}/>
        <FormComponent/>
        <div className='buttonWrapper'>
          <BigButton buttonName={BUTTON_NAME_ADD} disable={true} onClick={() => {
            
            if(!addElementData) {
              showToast('Fill required data');
              return;
            }
            showConfirmModal({
              title: 'Add element confirmation',
              message: `Do you want to add element?`,
              onConfirm: async () => {
                const elementData = addElementData.elementData;
                const data: any = {
                  "name": elementData.name,
                  "description": elementData.description,
                  "pageId": elementData.pageId,
                  "date": "2022-08-18T23:37:12.572Z"
                }

                if(['elementId', 'elementCss', 'elementXPath'].some((item: any) => {
                  return item in elementData;
                })) {
                  if(!('selectors' in data)) data['selectors'] = {};

                  if(elementData.elementId) {
                    data.selectors.elementId = elementData.elementId;
                  }
                  if(elementData.elementCss) {
                    data.selectors.elementCss = elementData.elementCss;
                  }
                  if(elementData.elementXPath) {
                    data.selectors.elementXPath = elementData.elementXPath;
                  }
                }

                if('pageObjectPattern' in elementData) {
                  data.pageObjectPattern = elementData.pageObjectPattern;
                }
                if('actionPatterns' in elementData) {
                  data.actionPatterns = elementData.actionPatterns;
                }
                if('parentElementId' in elementData) {
                  data.parentElementId = elementData.parentElementId;
                }

                const resp = await elementsRest.post(data);
                if(resp) {
                  store.dispatch({
                    type: ActionTypes.ADD_STORAGE_ITEM,
                    payload: {
                      key: 'elements',
                      data: resp
                    }
                  });
                  showToast('Element has been added');
                } else {
                  showToast('Can\'t added element from db. The application synchronizes this operation automatically');
                }
              }
            });
          }}/>
        </div>
      </div>
  );
};
