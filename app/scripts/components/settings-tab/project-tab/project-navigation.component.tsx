import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { SettingsActions } from '../../../redux/reducers/settings/settings.actions';

/**
 * Unique names of available tabs
 */
export enum SettingsProjectTabType {
  CONFIG = 'project-config',
  PAGES = 'pages',
}

/**
 * Settings Project navigation
*/
export function ProjectNavigation() {
  const dispatch = useDispatch();

  // get the tab name which should be set as active
  const activeTab = useSelector((state: RootState) => state.settings.project.tab);

  // navigate between the tabs
  const handleClick = (tab: SettingsProjectTabType) => {
    dispatch({
      type: SettingsActions.NAVIGATE_PROJECT,
      payload: tab
    });
  };

  return (
    <ul className="nav nav-tabs settings-child-nav">
      <li className="nav-item" key={SettingsProjectTabType.CONFIG}>
        <a
          className={`nav-link settings-tab-btn ${activeTab === SettingsProjectTabType.CONFIG ? 'active' : ''}`}
          onClick={() => handleClick(SettingsProjectTabType.CONFIG)}
        >
          Configuration
        </a>
      </li>
      <li className="nav-item" key={SettingsProjectTabType.PAGES}>
        <a
          className={`nav-link settings-tab-btn ${activeTab === SettingsProjectTabType.PAGES ? 'active' : ''}`}
          onClick={() => handleClick(SettingsProjectTabType.PAGES)}
        >
          Saved Pages
        </a>
      </li>
    </ul>
  );
}