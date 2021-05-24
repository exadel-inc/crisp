import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { SettingsActions } from '../../../redux/reducers/settings/settings.actions';

/**
 * Unique names of available tabs
 */
export enum SettingsFrameworkTabType {
  CONFIG = 'framework-config',
  OBJECTS = 'objects',
  ACTIONS = 'actions',
}

export function FrameworkNavigation() {
  const dispatch = useDispatch();

  // get the tab name which should be set as active
  const activeTab = useSelector((state: RootState) => state.settings.framework.tab);

  // navigate between the tabs
  const handleClick = (tab: SettingsFrameworkTabType) => {
    dispatch({
      type: SettingsActions.NAVIGATE_FRAMEWORK,
      payload: tab
    })
  };

  return (
    <ul className="nav nav-tabs settings-child-nav">
      <li className="nav-item" key={SettingsFrameworkTabType.CONFIG}>
        <a
          className={`nav-link settings-tab-btn ${activeTab === SettingsFrameworkTabType.CONFIG ? 'active' : ''}`}
          onClick={() => handleClick(SettingsFrameworkTabType.CONFIG)}
        >Configuration</a>
      </li>
      <li className="nav-item" key={SettingsFrameworkTabType.OBJECTS}>
        <a
          className={`nav-link settings-tab-btn ${activeTab === SettingsFrameworkTabType.OBJECTS ? 'active' : ''}`}
          onClick={() => handleClick(SettingsFrameworkTabType.OBJECTS)}
        >Page Objects</a>
      </li>
      <li className="nav-item" key={SettingsFrameworkTabType.ACTIONS}>
        <a
          className={`nav-link settings-tab-btn ${activeTab === SettingsFrameworkTabType.ACTIONS ? 'active' : ''}`}
          onClick={() => handleClick(SettingsFrameworkTabType.ACTIONS)}
        >Actions\Verifications</a>
      </li>
    </ul>
  );
}