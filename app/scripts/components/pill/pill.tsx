import * as React from 'react';
import './pill.scss';
import {useState} from 'react';
import {CheckedIcon} from '../checkedIcon/checkedIcon';
import {CloseIcon} from '../closeIcon/closeIcon';
import {DEFAULT_PROJECT_PAGE_NAME} from '../../constants/constants';
import {useDispatch, useSelector} from 'react-redux';
import {clearSelectedPageId, setSelectedPageId} from '../../redux/reducers/selectedPage/selectedPage.actionCreator';

export const Pill = ({pageName = DEFAULT_PROJECT_PAGE_NAME, pageId}: { pageName: string; pageId: number }) => {
  const [isRemove, setIsRemove] = useState(false);
  // @ts-ignore
  const {selectedPageId} = useSelector(state => state);
  const dispatch = useDispatch();
  const changeActiveStatus = () => {
    console.log(selectedPageId);
    if (!selectedPageId) {
      dispatch(setSelectedPageId(pageId));
    } else {
      dispatch(clearSelectedPageId());
    }

  };

  return (
    !isRemove ?
      <div onClick={changeActiveStatus} className={selectedPageId ? 'pill active' : 'pill'}>
        <p>{pageName}</p>
        {selectedPageId ? <CheckedIcon/> : <CloseIcon setIsRemove={setIsRemove}/>}
      </div>
      : null);
};
