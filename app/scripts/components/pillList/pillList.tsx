import React from 'react';
import {projectPageMoc} from '../../constants/moc';
import {Pill} from '../pill/pill';
import './pillList.scss';

export const PillList = () => {
  const pillList = projectPageMoc.map(pill => <Pill key={pill} pageName={pill}/>);

  return (<div className='pillList'>{pillList}</div>);
};
