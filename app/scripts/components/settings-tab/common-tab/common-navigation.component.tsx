import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { SettingsActions } from '../../../redux/reducers/settings/settings.actions';

/**
 * Unique names of available tabs
 */
export enum SettingsCommonTabType {
  STORAGE = 'storage',
}

export function CommonNavigation() {
  const dispatch = useDispatch();

  /**
   * Is current tab active
  */
  const activeTab = useSelector((state: RootState) => state.settings.common.tab);

  // navigate between the tabs
  const handleClick = (tab: SettingsCommonTabType) => {
    dispatch({
      type: SettingsActions.NAVIGATE_COMMON,
      payload: tab
    })
  };

  return (
    <ul className="nav nav-tabs settings-child-nav">
      <li className="nav-item" key={SettingsCommonTabType.STORAGE}>
        <a
          className={`nav-link settings-tab-btn ${activeTab === SettingsCommonTabType.STORAGE ? 'active' : ''}`}
          onClick={() => handleClick(SettingsCommonTabType.STORAGE)}
        >Storage</a>
      </li>
    </ul>
  );
}