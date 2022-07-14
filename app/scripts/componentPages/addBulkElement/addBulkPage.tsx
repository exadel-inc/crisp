import * as React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {NavigationTabType} from '../../components/header/navigationTypes';
import {BigButton} from '../../components/bigButton/bigButton';
import {BUTTON_NAME_BULK, PAGE_TITLE_NAME} from '../../constants/constants';
import {BulkFormComponent} from '../../components/bulkFormComponent/bulkFormComponent';
import {PageTitle} from '../../components/pageTitle/pageTitle';
import './addBulkPage.scss';

export const AddBulkPage = () => {
  const {ADD_BULK} = PAGE_TITLE_NAME;

  return (
      <div>
        <PageTitle title={ADD_BULK}/>
        <BulkFormComponent/>
        <div className='buttonWrapper'>
          <BigButton buttonName={BUTTON_NAME_BULK} disable={true}/>
        </div>
      </div>
  );
};
