import * as React from 'react';
import './pageTitle.scss';

export const PageTitle = ({title}: { title: string }) => {

  return (
    <h3 className='pageTitle'>{title}</h3>
  );
};
