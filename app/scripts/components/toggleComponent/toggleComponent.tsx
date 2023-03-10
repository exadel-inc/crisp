import React, { useState } from 'react';
import './toggleComponent.scss';

const Switch = ({ label = '', isOn = false}: {
  isOn: boolean;
  label: string;
}) => {
  return (
    <>
      <div className='switch-wrapper' title="App mode">
        <label
          className={`react-switch-label ${isOn ? 'checked': ''}`}
          htmlFor={`react-switch-new`}
        >
          <span className={`react-switch-button `} />
          <span className={`react-switch-lable-text`}>{label}</span>
        </label>
      </div>
    </>
  );
};

export default Switch;
