import * as React from 'react';
import {Checkbox} from '../checkbox/checkbox';
import './pageBar.scss';
import {GenerateButton} from '../generateButton/generateButton';

export const PageBar = ({selectedCount}: { selectedCount: number }) => {
  return (
    <div className='pageBar'>
      <p className='pageBarSelected'>Selected {selectedCount}</p>
      <GenerateButton/>
      <Checkbox/>
    </div>
  );
};
