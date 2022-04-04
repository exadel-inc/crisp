import * as React from 'react';
import {userSteps} from '../../constants/moc';
import './openTabElement.scss';

export const OpenTableElement = ({isOpen}: { isOpen: boolean }) => {
  const steps = userSteps.map(step => <p>{step}</p>);

  return (
    <div className={`openTableElement ${isOpen && 'openTableElement'}`}>
      <div><p>avt</p></div>
      <div>
        {steps}
      </div>
    </div>
  );
};
