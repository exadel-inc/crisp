import * as React from 'react';
import './openTabElement.scss';
import {useSelector} from 'react-redux';

export const OpenTableElement = ({
                                   isOpen,
                                   name,
                                   element: {actionPatterns}
                                 }: { isOpen: boolean; name: string; element: any }) => {

  // @ts-ignore
  const {storage:{patterns}} = useSelector(state => state);

  const patternsData = actionPatterns.map(({id}: { id: number }) => {
    const el = patterns.find(({_id}: { _id: number }) => _id === id);
    let content = 'Pattern not found';

    if (el) content = el.name;

    return <p className='openTableCommonText'>{content}</p>;
  });

  return (
    <div className={`openTableElement ${isOpen && 'activeOpenTableElement'}`}>
      <div className='openTableCommonText'>{name}</div>
      <div>
        <a>Edit attribute</a>
        {patternsData}
      </div>
    </div>
  );
};
