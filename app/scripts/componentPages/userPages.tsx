import * as React from 'react';

import {SearchComponent} from '../components/searchComponent/searchComponent';
import {ProjectPage} from '../componentPages/projectPage/projectPage';
import {AddElementPage} from '../componentPages/addElementPage/addElementPage';
import {AddBulkPage} from '../componentPages/addBulkElement/addBulkPage';

import { PagesTab } from '../components/settings-tab/project-tab/project-pages-tab.component';
import { PageObjectsTab } from '../components/settings-tab/framework-tab/framework-page-objects-tab.component';
import { ActionsTab } from '../components/settings-tab/framework-tab/framework-actions-tab.component';
import { NavigationTabType } from '../components/header/navigationTypes';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const getCurrentPage = (pageType: NavigationTabType) => {
  switch (pageType) {
    case NavigationTabType.MAIN:
      return <ProjectPage/>;
    case NavigationTabType.ACTION:
      return <ActionsTab/>;
    case NavigationTabType.PATTERN:
      return <PageObjectsTab/>;
    case NavigationTabType.PAGE:
      return <PagesTab/>;
    case NavigationTabType.ADD_BULK:
      return <AddBulkPage/>;
    case NavigationTabType.ADD_ELEMENT:
      return <AddElementPage/>;
    case NavigationTabType.SEARCH:
      return <SearchComponent/>;
    default:
      return <ProjectPage/>;
  }
};

export default function UserPages () {
  const navTab: NavigationTabType = useSelector((state: RootState) => state.navigation.tab, shallowEqual);

  return (
    <>
      {
        getCurrentPage(navTab)
      }
    </>
  );
}