import React from 'react';
import {Pill} from '../pill/pill';
import './pillList.scss';

export const PillList = ({projectId}: { projectId: number }) => {
  // @ts-ignore
  const elementsData = JSON.parse(localStorage.getItem('pages'));
  let pagesContent = 'No elements';

  if (elementsData && elementsData.length > 0) {
    pagesContent = elementsData.filter((el: any) => el.project === projectId).map(
      // @ts-ignore
      el => {
        const {name, _id} = el;

        return <Pill key={_id} pageName={name} pageId={_id}/>;
      }
    );
  }

  return (<div className='pillList'>{pagesContent}</div>);
};
