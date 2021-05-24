import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { SettingsActions } from '../../redux/reducers/settings/settings.actions';

export enum SettingsTabType {
  COMMON = 'settings-common',
  PROJECT = 'settings-project',
  FRAMEWORK = 'settings-framework',
}

/**
 * Settings navigation
*/
export function SettingsNavigation() {
  const dispatch = useDispatch();

  /**
   * is current tab active
  */
  const activeTab = useSelector((state: RootState) => state.settings.tab);

  /**
   * navigate through tabs
  */
  const handleClick = (tab: SettingsTabType) => {
    dispatch({
      type: SettingsActions.NAVIGATE,
      payload: tab
    })
  };

  return (
    <ul className="nav nav-pills pb-3 pl-5 settings-main-nav">
      <li className="nav-item" key={SettingsTabType.COMMON}>
        <a
          className={`nav-link py-1 ${activeTab === SettingsTabType.COMMON ? 'active' : ''}`}
          onClick={() => handleClick(SettingsTabType.COMMON)}
        >Common</a>
      </li>
      <li className="nav-item" key={SettingsTabType.PROJECT}>
        <a
          className={`nav-link py-1 ${activeTab === SettingsTabType.PROJECT ? 'active' : ''}`}
          onClick={() => handleClick(SettingsTabType.PROJECT)}
        >Project</a>
      </li>
      <li className="nav-item" key={SettingsTabType.FRAMEWORK}>
        <a
          className={`nav-link py-1 ${activeTab === SettingsTabType.FRAMEWORK ? 'active' : ''}`}
          onClick={() => handleClick(SettingsTabType.FRAMEWORK)}
        >Framework</a>
      </li>
    </ul>
  );
}