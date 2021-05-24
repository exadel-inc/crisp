import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

import { SettingsTabType } from '../settings-navigation.component';
import { CommonNavigation } from './common-navigation.component';
import { StorageTab } from './common-storage-tab.component';

/**
 * Settings -> common tab
*/
export function CommonTab() {
  /**
   * Is current tab active
  */
  const isActive = useSelector((state: RootState) => state.settings.tab) === SettingsTabType.COMMON;

  return isActive ? (
    <div
      id={SettingsTabType.COMMON}
      className={`tab-pane fade ${isActive ? 'show active' : ''}`}
    >
      <CommonNavigation/>
      <div className="tab-content mt-3">
        <StorageTab/>
      </div>
    </div>
  ) : null;
}
