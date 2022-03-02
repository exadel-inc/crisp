import * as React from 'react';
import {useState} from 'react';
import {BigButton} from '../bigButton/bigButton';

export const SearchComponent = () => {
  const [value, setValue] = useState('');

  const checkLengthValue = () => {
    return value.length > 0;
  };

  return (
    <form className="searchForm">
      <input
        onChange={(e) => setValue(e.target.value)}
        className="search"
        placeholder="Search a framework, project, or element"
        type="search"
        style={checkLengthValue() ? {background: 'none'} : {}}
      />
      <BigButton buttonName='Search' disable={checkLengthValue()}/>
    </form>
  );
};
