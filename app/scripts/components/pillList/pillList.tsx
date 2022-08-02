import React from 'react';
import {Pill} from '../pill/pill';
import './pillList.scss';
import {useSelector} from 'react-redux';

export const PillList = ({projectId}: { projectId: number }) => {
  // @ts-ignore
  const {storage:{pages}} = useSelector(state => state);
  let pagesContent = 'No elements';

  if (pages && pages.length > 0) {
    pagesContent = pages.filter((el: any) => el.project === projectId).map(
      // @ts-ignore
      el => {
        const {name, _id} = el;

        return <Pill key={_id} pageName={name} pageId={_id}/>;
      }
    );
  }

  return (<div className='pillList'>{pagesContent}</div>);
};
