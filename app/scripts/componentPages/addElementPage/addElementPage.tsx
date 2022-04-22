import * as React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {NavigationTabType} from '../../components/header/navigation-tabs';
import {GeneralAddComponent} from '../../components/generalAddComponent/generalAddComponent';
import {BigButton} from '../../components/bigButton/bigButton';
import {BUTTON_NAME_ADD} from '../../constants/constants';
import './addElementPage.scss';

export const AddElementPage = () => {
  const isActive = useSelector((state: RootState) => state.navigation.tab) === NavigationTabType.ADD_ELEMENT;

  return (
    isActive ?
      <div>
        <GeneralAddComponent/>
        <div className='buttonWrapper'>
          <BigButton buttonName={BUTTON_NAME_ADD} disable={true}/>
        </div>
      </div>
      : null
  );
};
