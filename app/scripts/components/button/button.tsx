import * as React from 'react';
import './button.scss';

export const Button = ({buttonName, action, iconClass}: {
  buttonName: string;
  action: () => void;
  iconClass: string;
}) => {
  return (
    <button className={`tableButton ${iconClass}`} onClick={action}>
      {buttonName}
    </button>
  );
};
