import React from 'react';
import {TableElement} from '../tableElement/tableElement';

export const TabElementsList = ({selectedPageId}: { selectedPageId: number }) => {

  // @ts-ignore
  const elementsData = JSON.parse(localStorage.getItem('elements'));
  let elementsContent = 'List of elements is empty';

  if (elementsData && elementsData.length > 0) {
    elementsContent = elementsData.filter((el: any) => el.page === selectedPageId).map(
      // @ts-ignore
      (el) => {
        const {name, _id} = el;

        return <TableElement key={_id} name={name} element={el}/>;
      }
    );
  }

  return (
    <div>
      {elementsContent}
    </div>);
};
