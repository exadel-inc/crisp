import React from 'react';
import {ADD_PAGE_BUTTON_NAME} from '../../constants/constants';
import { InputComponent } from '../inputComponent/inputComponent';
import { TextComponent } from '../textComponent/textComponent';
import { showToast } from '../shared/toasts-component';
import './addPageButton.scss';
import { useConfirmModal } from '../shared/confirm-modal/confirm-modal';
import { Button } from '../button/button';
import { restApi } from '../../serverRestApi';
import store from '../../redux/store';
import { ActionTypes } from '../../redux/reducers/storage/storage.actions';

const pageRest = restApi('pages');

const createPage = async (createData: any) => {
  const data = await pageRest.post(createData);

  if(data) {
    data.project = data.projectId;
    delete data.projectId;
    store.dispatch({
      type: ActionTypes.ADD_STORAGE_ITEM,
      payload: {
        key: 'pages',
        data: data
      }
    });
    showToast('Pages successfully added');
  } else {
    showToast('Can\'t added pages in db. The application synchronizes this operation automatically');
  }
};

export const AddPageButton = ({projectId}: {projectId: number}) => {
  const showConfirmModal = useConfirmModal();

  return (
    <div className='addPageButton' onClick={() => {
      showConfirmModal({
        title: 'Create page',
        isHideButtons: true,
        body: <>
        <form className='create-page' onSubmit={async (e: any) => {
          e.preventDefault();
          const elements: any = e.target?.elements || {};
          const pageName = elements?.pageName.value || '';
          const description = elements?.description.value || '';
          const parojectId = projectId || '';
          await createPage({
            "description": description,
            "name": pageName,
            "projectId": parojectId,
            "date": "2022-08-16T23:57:58.153Z"
          });
        }}>
          <InputComponent label='Page Name'  formName={'pageName'} name={'pageName'} defaultValue={''} />
          <TextComponent label={'Description'} formName={'description'} isOnlyTextarea={true} name={'description'} defaultValue={''} />
          <Button type={'submit'} buttonName={'Create'} iconClass={''} action={async () => {}} />
        </form>
        </>
      });
    }}>
      <svg className='defaultIconFill' viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M7.66659 3.66668H6.33325V6.33334H3.66659V7.66668H6.33325V10.3333H7.66659V7.66668H10.3333V6.33334H7.66659V3.66668ZM6.99992 0.333344C3.31992 0.333344 0.333252 3.32001 0.333252 7.00001C0.333252 10.68 3.31992 13.6667 6.99992 13.6667C10.6799 13.6667 13.6666 10.68 13.6666 7.00001C13.6666 3.32001 10.6799 0.333344 6.99992 0.333344ZM6.99992 12.3333C4.05992 12.3333 1.66659 9.94001 1.66659 7.00001C1.66659 4.06001 4.05992 1.66668 6.99992 1.66668C9.93992 1.66668 12.3333 4.06001 12.3333 7.00001C12.3333 9.94001 9.93992 12.3333 6.99992 12.3333Z"/>
      </svg>
      <p>{ADD_PAGE_BUTTON_NAME}</p>
    </div>);
};
