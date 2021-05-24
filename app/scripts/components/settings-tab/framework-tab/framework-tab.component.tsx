import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

import { SettingsTabType } from '../settings-navigation.component';
import { FrameworkNavigation } from './framework-navigation.component';
import { ConfigurationTab } from './framework-configuration-tab.component';
import { PageObjectsTab } from './framework-page-objects-tab.component';
import { ActionsTab } from './framework-actions-tab.component';

/**
 * Settings -> framework tab
*/
export function FrameworkTab() {
  // true, if the tab is active
  const isActive = useSelector((state: RootState) => state.settings.tab) === SettingsTabType.FRAMEWORK;

  return isActive ? (
    <div
      id={SettingsTabType.FRAMEWORK}
      className={`tab-pane fade ${isActive ? 'show active' : ''}`}
    >
      <FrameworkNavigation/>
      <div className="tab-content mt-3">
        <ConfigurationTab/>
        <PageObjectsTab/>
        <ActionsTab/>
      </div>
    </div>
  ) : null;
}