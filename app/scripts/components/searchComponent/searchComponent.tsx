import * as React from 'react';
import {useState} from 'react';
import {BigButton} from '../bigButton/bigButton';
import {SEARCH_BUTTON_NAME, SEARCH_PLACEHOLDER} from '../../constants/constants';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {NavigationTabType} from '../header/navigationTypes';
import './searchComponent.scss';

export const SearchComponent = () => {
  const [value, setValue] = useState('');

  const checkLengthValue = () => {
    return value.length > 0;
  };

  return (
      <form onSubmit={e => e.preventDefault()} className="searchForm">
        <input
          onChange={(e) => setValue(e.target.value)}
          className="search"
          placeholder={SEARCH_PLACEHOLDER}
          type="search"
          style={checkLengthValue() ? {background: 'none'} : {}}
        />
        <BigButton buttonName={SEARCH_BUTTON_NAME} disable={checkLengthValue()} onClick={() => {}}/>
      </form>
  );
};
