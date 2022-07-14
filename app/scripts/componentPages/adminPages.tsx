import * as React from 'react';

import { ConfigurationTab as Project } from '../components/settings-tab/project-tab/project-configuration-tab.component';
import { ConfigurationTab as Framework  } from '../components/settings-tab/framework-tab/framework-configuration-tab.component';
import { NavigationTabType } from '../components/header/navigationTypes';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const getCurrentPage = (pageType: NavigationTabType) => {
  switch (pageType) {
    case NavigationTabType.PROJECT:
      return <Project/>;
    case NavigationTabType.FRAMEWORK:
      return <Framework/>;
    case NavigationTabType.USER_MANAGER:
      return <></>;
    default:
      return <Project/>;
  }
};

export default function AdminPages () {
  const navTab: NavigationTabType = useSelector((state: RootState) => state.navigation.tab, shallowEqual);

  return (
    <>
      {
        getCurrentPage(navTab)
      }
    </>
  );
}