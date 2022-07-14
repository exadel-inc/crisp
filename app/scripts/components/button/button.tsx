import * as React from 'react';
import './button.scss';

export const Button = ({buttonName, action = () => {}, iconClass, type = undefined}: {
  buttonName: string;
  action: () => void;
  iconClass: string;
  type?: any;
}) => {
  return (
    <button type={type} className={`tableButton ${iconClass}`} onClick={action}>
      {buttonName}
    </button>
  );
};
