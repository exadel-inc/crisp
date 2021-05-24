import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

import { NavigationTabType } from '../header/navigation-tabs';
import { SettingsNavigation } from './settings-navigation.component';
import { CommonTab } from './common-tab/common-tab.component';
import { ProjectTab } from './project-tab/project-tab.component';
import { FrameworkTab } from './framework-tab/framework-tab.component';

/**
 * Settings tab
*/
export function SettingsTab() {
  /**
   * is current tab active
  */
  const isActive = useSelector((state: RootState) =>
    state.navigation.tab) === NavigationTabType.SETTINGS;

  return isActive ? (
    <div
      id={NavigationTabType.SETTINGS}
      className={`tab-pane fade ${isActive ? 'show active' : ''}`}
    >
      <SettingsNavigation/>
      <div className="tab-content">
        <CommonTab/>
        <ProjectTab/>
        <FrameworkTab/>
      </div>
    </div>
  ) : null;
}
