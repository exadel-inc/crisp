import * as React from 'react';
import {useState} from 'react';
import {TEXT_COMPONENT_BUTTON_NAME, TEXT_COMPONENT_TAB_NAME} from '../../constants/constants';
import {textComponentMoc} from '../../constants/moc';
import './textComponent.scss';

export const TextComponent = ({name = '', value = '', isOnlyTextarea = false, label = '', disabled = false, defaultValue = '', formName = ''}) => {
  const {TEST_ACTION} = TEXT_COMPONENT_TAB_NAME;
  const {COPY, RESET} = TEXT_COMPONENT_BUTTON_NAME;
  const [activeTab, setActiveTab] = useState(TEST_ACTION);

  const tabs = Object.values(TEXT_COMPONENT_TAB_NAME).map(tab =>
    <p onClick={() => setActiveTab(tab)}
       className={`textTab ${activeTab === tab && 'activeTextTab'}`}>{tab}</p>
  );

  return isOnlyTextarea ? (
  <><div className='textComponent'>
    <div className='textarea-label'>{label}</div>
    <textarea disabled={disabled} name={formName} defaultValue={(value || defaultValue)} />
  </div>
  </>) : (
    <div className='textComponent'>
      <div className='textTabWrapper'>
        {tabs}
      </div>
      <textarea name={name} defaultValue={value || defaultValue} />
      <div className='textButtonWrapper'>
        <button>{RESET}</button>
        <button>{COPY}</button>
      </div>
    </div>
  );
};
