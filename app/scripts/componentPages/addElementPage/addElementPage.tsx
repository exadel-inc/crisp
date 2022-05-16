import * as React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {NavigationTabType} from '../../components/header/navigation-tabs';
import {FormComponent} from '../../components/generalAddComponent/formComponent';
import {BigButton} from '../../components/bigButton/bigButton';
import {BUTTON_NAME_ADD, PAGE_TITLE_NAME} from '../../constants/constants';
import {PageTitle} from '../../components/pageTitle/pageTitle';
import './addElementPage.scss';

export const AddElementPage = () => {
  const isActive = useSelector((state: RootState) => state.navigation.tab) === NavigationTabType.ADD_ELEMENT;
  const {ADD_ELEMENT} = PAGE_TITLE_NAME;

  return (
    isActive ?
      <div>
        <PageTitle title={ADD_ELEMENT}/>
        <FormComponent/>
        <div className='buttonWrapper'>
          <BigButton buttonName={BUTTON_NAME_ADD} disable={true}/>
        </div>
      </div>
      : null
  );
};
