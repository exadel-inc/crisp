import * as React from 'react';
import {Checkbox} from '../checkbox/checkbox';
import './pageBar.scss';
import {GenerateButton} from '../generateButton/generateButton';

export const PageBar = () => {
  //In curent version we support only one selected page

  return (
    <div className='pageBar'>
      {/* <p className='pageBarSelected'>Selected {selectedCount}</p> */}
      <GenerateButton/>
      {/* <Checkbox/> */}
    </div>
  );
};
