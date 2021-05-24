import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

import { SettingsTabType } from '../settings-navigation.component';
import { ProjectNavigation } from './project-navigation.component';
import { ConfigurationTab } from './project-configuration-tab.component';
import { PagesTab } from './project-pages-tab.component';

/**
 * Settings -> project tab
*/
export function ProjectTab() {
  // true, if the tab is active
  const isActive = useSelector((state: RootState) => state.settings.tab) === SettingsTabType.PROJECT;

  return isActive ? (
    <div
      id={SettingsTabType.PROJECT}
      className={`tab-pane fade ${isActive ? 'show active' : ''}`}
    >
      <ProjectNavigation/>
      <div className="tab-content mt-3">
        <ConfigurationTab/>
        <PagesTab/>
      </div>
    </div>
  ) : null;
}