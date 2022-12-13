import * as React from 'react';
import {useState} from 'react';
import {TEXT_COMPONENT_BUTTON_NAME, TEXT_COMPONENT_TAB_NAME} from '../../constants/constants';
import { useSelector, useDispatch } from 'react-redux';
import { GenerateDataActions } from '../../redux/reducers/generateDatas/generateData.actions';
import './generateScriptTab.scss';

export const GenerateScriptTab = ({name = ''}) => {
  const generatedDatas = useSelector((state: any) => state.generatedDatas);
  const {TEST_ACTION} = TEXT_COMPONENT_TAB_NAME;
  const {COPY, RESET} = TEXT_COMPONENT_BUTTON_NAME;
  const [activeTab, setActiveTab] = useState(TEST_ACTION);
  const dispatch = useDispatch();
  let timeOutId: any;

  const generatedData = (): string => {
    return activeTab === TEST_ACTION ? generatedDatas.testActions : generatedDatas.pageObjects;
  };

  const tabs = Object.values(TEXT_COMPONENT_TAB_NAME).map(tab =>
    <p onClick={() => setActiveTab(tab)}
      className={`textTab ${activeTab === tab && 'activeTextTab'}`}>{tab}</p>
  );

  return (
    <div className='textComponent'>
      <div className='textTabWrapper'>
        {tabs}
      </div>
      <textarea name={name} value={generatedData()} onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.currentTarget.value || '';
        if(timeOutId) clearTimeout(timeOutId);

        timeOutId = setTimeout(() => {
          if(timeOutId) {
            clearTimeout(timeOutId);
          }

          dispatch({
            type: activeTab === TEST_ACTION ? GenerateDataActions.GENERATE_TEST_ACTIONS : GenerateDataActions.GENERATE_PAGE_OBJECTS,
            payload: value
          });
        }, 1.5);
      }}  />
      <div className='textButtonWrapper'>
        <button>{RESET}</button>
        <button>{COPY}</button>
      </div>
    </div>
  );
};
