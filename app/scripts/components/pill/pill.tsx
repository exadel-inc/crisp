import * as React from 'react';
import './pill.scss';
import {useState} from 'react';
import {CheckedIcon} from '../checkedIcon/checkedIcon';
import {CloseIcon} from '../closeIcon/closeIcon';
import {DEFAULT_PROJECT_PAGE_NAME} from '../../constants/constants';
import {useDispatch, useSelector} from 'react-redux';
import {clearSelectedPageId, setSelectedPageId} from '../../redux/reducers/selectedPage/selectedPage.actionCreator';
import {WriteToStorageAction} from '../../redux/reducers/storage/storage.actions';
import store from "../../redux/store";
import {clearSelectedProjectId} from "../../redux/reducers/selectedProject/selectedProject.actionCreator";

export const Pill = ({pageName = DEFAULT_PROJECT_PAGE_NAME, pageId}: { pageName: string; pageId: number }) => {
  const [isRemove, setIsRemove] = useState(false);
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

  const deletePage = () => {
    console.log(pages);
    console.log(pages.filter((el: any) => el._id !== pageId));
    dispatch(clearSelectedProjectId());
    dispatch(clearSelectedPageId());
    dispatch({
      ...new WriteToStorageAction(
        {key: 'pages', data: pages.filter((el: any) => el._id !== pageId)})
    });
  };


  return (
    pages.find((el: any) => el._id === pageId) ?
      <div onClick={changeActiveStatus} className={selectedPageId ? 'pill active' : 'pill'}>
        <p>{pageName}</p>
        {selectedPageId ? <CheckedIcon/> : <CloseIcon setIsRemove={deletePage}/>}
      </div>
      : null);
};
