import React, {useState} from 'react';
import './generateButton.scss';
import {GENERATE_BUTTON_NAME} from '../../constants/constants';
import { GenerateScript } from '../generateScriptTab/generateScript';

const generateScript = new GenerateScript();

export const GenerateButton = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <button
      onClick={() => {
        const newState = !isActive;
        setIsActive(newState);

        if(newState) {
          generateScript.generateDataScripts();
        }
      }}
      className={`generateButton ${isActive && 'generateButtonActive'}`}>
      {GENERATE_BUTTON_NAME}
    </button>
  );
};
