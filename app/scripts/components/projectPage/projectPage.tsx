import * as React from 'react';
import {BigButton} from '../bigButton/bigButton';
import {ADD_PROJECT_BUTTON_NAME} from '../../constants/constants';
import {ProjectList} from '../projectList/projectList';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {NavigationTabType} from '../header/navigation-tabs';
import {ProjectPageHeader} from '../projectPageHeader/projectPageHeader';
import {TextComponent} from '../textComponent/textComponent';
import {PageBar} from '../pageBar/pageBar';

export const ProjectPage = () => {
  const isActive = useSelector((state: RootState) => state.navigation.tab) === NavigationTabType.MAIN;

  return (
    isActive ?
      <>
        <ProjectPageHeader/>
        <PageBar selectedCount={2}/>
        <div className='projectPage'>
          <ProjectList/>
          <TextComponent/>
          <div className='buttonWrapper'>
            <BigButton buttonName={ADD_PROJECT_BUTTON_NAME} disable={true}/>
          </div>
        </div>
      </>
      : null
  );
};
