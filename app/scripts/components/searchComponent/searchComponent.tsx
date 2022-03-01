import * as React from 'react';
import {useState} from 'react';

export const SearchComponent = () => {
  const [value, setValue] = useState('');

  return (
    <form>
      <input
        onChange={(e) => setValue(e.target.value)}
        className="search"
        placeholder="Search a framework, project, or element"
        type="search"
        style={value.length > 0 ? {background: 'none'} : {}}
      />
    </form>
  );
};
