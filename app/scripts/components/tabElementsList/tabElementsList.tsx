import React from 'react';
import {TableElement} from '../tableElement/tableElement';
import {useSelector} from 'react-redux';

export const TabElementsList = ({selectedPageId, projectId}: { selectedPageId: number; projectId: any }) => {

  // @ts-ignore
  const {storage: {elements}} = useSelector(state => state);
  let elementsContent = 'List of elements is empty';

  if (elements && elements.length > 0) {
    elementsContent = elements.filter((el: any) => el.page === selectedPageId).map(
      // @ts-ignore
      (el) => {
        const {name, _id} = el;

        return <TableElement key={_id} name={name} element={el} pageId={selectedPageId} projectId={projectId}/>;
      }
    );
  }

  return (
    <div>
      {elementsContent}
    </div>);
};
