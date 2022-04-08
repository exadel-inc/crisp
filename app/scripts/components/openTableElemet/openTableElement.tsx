import * as React from 'react';
import {userSteps} from '../../constants/moc';
import './openTabElement.scss';

export const OpenTableElement = ({isOpen}: { isOpen: boolean }) => {
  const steps = userSteps.map(step => <p className='openTableCommonText'>{step}</p>);

  return (
    <div className={`openTableElement ${isOpen && 'activeOpenTableElement'}`}>
      <div className='openTableCommonText'>avt</div>
      <div>
        <a>Edit attribute</a>
        {steps}
      </div>
    </div>
  );
};
