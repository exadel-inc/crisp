import React, {useState} from 'react';
import './generateButton.scss';
import {GENERATE_BUTTON_NAME} from '../../constants/constants';

export const GenerateButton = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <button
      onClick={() => setIsActive(state => !state)}
      className={`generateButton ${isActive && 'generateButtonActive'}`}>
      {GENERATE_BUTTON_NAME}
    </button>
  );
};
