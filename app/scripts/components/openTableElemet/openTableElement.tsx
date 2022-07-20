import * as React from 'react';
import {userSteps} from '../../constants/moc';
import './openTabElement.scss';

export const OpenTableElement = ({
                                   isOpen,
                                   name,
                                   element: {actionPatterns}
                                 }: { isOpen: boolean; name: string; element: any }) => {
  const steps = userSteps.map(step => <p className='openTableCommonText'>{step}</p>);

  // @ts-ignore
  const patternsData = JSON.parse(localStorage.getItem('patterns'));

  const patternsList = actionPatterns.map(({id}: { id: number }) => {
    const pattern = patternsData.find(({_id}: { _id: number }) => _id === id);
    let content = 'Pattern not found';

    if (pattern) content = pattern.name;

    return <p className='openTableCommonText'>{content}</p>;
  });
  console.log(patternsList);

  return (
    <div className={`openTableElement ${isOpen && 'activeOpenTableElement'}`}>
      <div className='openTableCommonText'>{name}</div>
      <div>
        <a>Edit attribute</a>
        {patternsList}
      </div>
    </div>
  );
};
