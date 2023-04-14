import * as React from 'react';
import './pill.scss';
import {useState} from 'react';
import {CheckedIcon} from '../checkedIcon/checkedIcon';
import {CloseIcon} from '../closeIcon/closeIcon';
import {DEFAULT_PROJECT_PAGE_NAME} from '../../constants/constants';
import {useDispatch, useSelector} from 'react-redux';
import {clearSelectedPageId, setSelectedPageId} from '../../redux/reducers/selectedPage/selectedPage.actionCreator';
import {ActionTypes, WriteToStorageAction} from '../../redux/reducers/storage/storage.actions';
import store from '../../redux/store';
import {clearSelectedProjectId} from '../../redux/reducers/selectedProject/selectedProject.actionCreator';
import { restApi } from '../../serverRestApi';
import { showToast } from '../shared/toasts-component';
import { useConfirmModal } from '../shared/confirm-modal/confirm-modal';

const pageRest = restApi('pages');

export const Pill = ({pageName = DEFAULT_PROJECT_PAGE_NAME, pageId}: { pageName: string; pageId: number }) => {
  const [isRemove, setIsRemove] = useState(false);
  const showConfirmModal = useConfirmModal();
  // @ts-ignore
  const {selectedPageId, storage: {pages}} = useSelector(state => state);
  const dispatch = useDispatch();
  const changeActiveStatus = () => {

    if (!selectedPageId) {
      dispatch(setSelectedPageId(pageId));
    } else {
      dispatch(clearSelectedPageId());
    }

  };

  const deletePage = (e: any) => {
    e.stopPropagation();
    if(pageId) {
      showConfirmModal({
        title: 'Delete page',
        message: 'Do you want to delete page?',
        onConfirm: async () => {
          const resp = await pageRest.del(pageId.toString());
          if(resp) {
            console.log(pageId);
            dispatch(clearSelectedProjectId());
            dispatch(clearSelectedPageId());
            dispatch({
              type: ActionTypes.DELETE_STORAGE_ITEM,
              payload: {
                key: 'pages',
                id: pageId
              }});
            showToast('Page has been removed');
          } else {
            showToast('Can\'t remove page from db. The application synchronizes this operation automatically');
          }
        }
      });
    } else {
      showToast('Page does not exist');
    }
  };

  const isSelected: boolean = pageId === selectedPageId;

  return (
    pages.find((el: any) => el._id === pageId) ?
      <div onClick={changeActiveStatus} className={isSelected ? 'pill active' : 'pill'}>
        <p>{pageName}</p>
        {isSelected ? <CheckedIcon/> : <CloseIcon setIsRemove={deletePage}/>}
      </div>
      : null);
};
