import * as React from 'react';
import {useState} from 'react';
import {TEXT_COMPONENT_BUTTON_NAME, TEXT_COMPONENT_TAB_NAME} from '../../constants/constants';
import {textComponentMoc} from '../../constants/moc';
import './textComponent.scss';

export const TextComponent = () => {
  const {TEST_ACTION} = TEXT_COMPONENT_TAB_NAME;
  const {COPY, RESET} = TEXT_COMPONENT_BUTTON_NAME;
  const [activeTab, setActiveTab] = useState(TEST_ACTION);

  const tabs = Object.values(TEXT_COMPONENT_TAB_NAME).map(tab =>
    <p onClick={() => setActiveTab(tab)}
       className={`textTab ${activeTab === tab && 'activeTextTab'}`}>{tab}</p>
  );

  return (
    <div className='textComponent'>
      <div className='textTabWrapper'>
        {tabs}
      </div>
      <textarea>{textComponentMoc}</textarea>
      <div className='textButtonWrapper'>
        <button>{RESET}</button>
        <button>{COPY}</button>
      </div>
    </div>
  );
};
