import * as React from 'react';
import {useState} from 'react';
import {Expander} from '../expander/expander';
import {OpenTableElement} from '../openTableElemet/openTableElement';
import {Button} from '../button/button';
import {TABLE_BUTTON_NAME} from '../../constants/constants';
import {DeleteComponent} from '../deletComponent/deleteComponent';
import { GenerateScript } from '../generateScriptTab/generateScript';
import {ActionTypes} from '../../redux/reducers/storage/storage.actions';
import './tableElement.scss';
import { restApi } from '../../serverRestApi';
import { showToast } from '../shared/toasts-component';
import { useDispatch } from 'react-redux';
import { useConfirmModal } from '../shared/confirm-modal/confirm-modal';
import { NavigateAction } from '../../redux/reducers/navigation/navigation.actions';
import { NavigationTabType } from '../header/navigationTypes';
import { AddElementActions } from '../../redux/reducers/addElementData/addElementData.actions';

const elementsService = restApi('elements');
const generateData = new GenerateScript();

export const TableElement = ({name, element, pageId, projectId}: { name: string; element: any; pageId: any; projectId: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const showConfirmModal = useConfirmModal();

  const {DELETE, EDIT, INSERT} = TABLE_BUTTON_NAME;

  const changeState = () => {
    setIsOpen(prevState => !prevState);
  };

  const deleteElement = (e: any) => {
    const elId = element.id || element._id;
    e.stopPropagation();
    if(elId) {
      showConfirmModal({
        title: 'Delete element',
        message: 'Do you want to delete element?',
        onConfirm: async () => {
          const resp = await elementsService.del(elId.toString());
          if(resp) {
            console.log(elId);
            dispatch({
              type: ActionTypes.DELETE_STORAGE_ITEM,
              payload: {
                key: 'elements',
                id: elId
              }
            });
            showToast('Element has been removed');
          } else {
            showToast('Can\'t remove element from db. The application synchronizes this operation automatically');
          }
        }
      });
    } else {
      showToast('Element does not exist');
    }
  };

  return (
    <div className='tableElementWrapper'>
      <div className={`tableElement ${isOpen && 'openTable'}`}>
        <div className='coloredPart'>
          <svg viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 16H3V13.3333H0V16ZM0 9.33333H3V6.66667H0V9.33333ZM0 0V2.66667H3V0H0Z"/>
          </svg>
        </div>
        <div className='infoSection'>
          {isOpen ? <>
            <Button buttonName={EDIT} action={() => {
              // dispatch({...new NavigateAction(tab)});
              dispatch({
                type: AddElementActions.INIT_DATA,
                payload: {
                  data: {
                    projectId: projectId.toString(),
                    elementData: {
                      _id: element._id || '',
                      pageId: pageId.toString(),
                      description: element.description || '',
                      name: element.name || '',

                      pageObjectPattern: element.pageObjectPattern || '',
                      elementId: element?.selectors?.elementId || '',
                      elementCss: element?.selectors?.elementCss || '',
                      elementXPath: element?.selectors?.elementXPath || '',
                      parentElementId: element.parentElement || '',
                      actionPatterns: element.actionPatterns || []
                    }
                  }
                }
              });
              dispatch({...new NavigateAction(NavigationTabType.ADD_ELEMENT)});
            }} iconClass='tableEditButton'/>
            <Button buttonName={INSERT} action={() => {
              generateData.generateAndInputElementToScripts(element);
            }} iconClass='tableInsertButton'/>
            <Button buttonName={DELETE} action={deleteElement} iconClass='tableDeleteButton'/>
          </> : <>
            <p>{name}</p>
            <p>not displayed</p>
            <DeleteComponent style='tableDeleteIcon'/>
          </>
          }
          <Expander isOpen={isOpen} changeState={changeState}/>
        </div>
      </div>
      {isOpen ? <OpenTableElement isOpen={isOpen} name={name} element={element}/> : null}
    </div>
  );
};
