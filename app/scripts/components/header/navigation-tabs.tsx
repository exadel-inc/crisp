import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ResetInspectedElementAction} from '../../redux/reducers/inspected-element/inspected-element.actions';
import {NavigateAction} from '../../redux/reducers/navigation/navigation.actions';
import {RootState} from '../../redux/store';
import {AddIcon} from '../tab-icons/addIcon';
import {AddBulkIcon} from '../tab-icons/addBulkIcon';
import {SettingsIcon} from '../tab-icons/settingsIcon';
import {CommonTabLogic} from '../tab-icons/commonTabLogic';
import {SearchIcon} from '../tab-icons/searchIcon';
import './navigation-tabs.scss';
import '../../../styles/commonClasses.scss';

export enum NavigationTabType {
  MAIN = 'main',
  BATCH = 'batch',
  INSPECTOR = 'inspector',
  SETTINGS = 'settings',
  SEARCH = 'search',
}

/**
 * Main navigation tabs
 */
export function NavigationTabs() {

  /**
   * Is current tab active
   */
  const isActive = (tabId: NavigationTabType) => useSelector((state: RootState) => state.navigation.tab) === tabId;

  const dispatch = useDispatch();

  /**
   * Function called on tab click
   * @param tab {NavigationTabType} determines which tab was clicked
   */
  const handleTabClick = (tab: NavigationTabType) => {
    dispatch({...new NavigateAction(tab)});
    // reset currentInspected Element on each manual navigation to inspector tab
    if (tab === NavigationTabType.INSPECTOR) {
      dispatch({...new ResetInspectedElementAction()});
    }
  };

  return (
    <ul className="nav nav-pills d-flex justify-content-center" id="crisp-tabs">
      <li className="nav-item text-primary">
        <a className={`nav-link crisp-tab  ${isActive(NavigationTabType.MAIN) && 'active'}`} data-toggle="pill"
           data-tab-name="main"
           onClick={() => handleTabClick(NavigationTabType.MAIN)}
        >
          <svg className="bi bi-file-text" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"
               xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd"
                  d="M4 1h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H4z"/>
            <path fillRule="evenodd"
                  d="M4.5 10.5A.5.5 0 0 1 5 10h3a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm0-2A.5.5 0 0 1 5 8h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm0-2A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm0-2A.5.5 0 0 1 5 4h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5z"/>
          </svg>
        </a>
      </li>
      <CommonTabLogic handleTabClick={handleTabClick}
                      isActive={isActive}
                      activeTab={NavigationTabType.INSPECTOR}
                      children={<AddIcon className={isActive(NavigationTabType.INSPECTOR) ?
                        'activeIconFill' : 'defaultIconFill'
                      }/>}/>
      <CommonTabLogic handleTabClick={handleTabClick}
                      isActive={isActive}
                      activeTab={NavigationTabType.BATCH}
                      children={<AddBulkIcon className={isActive(NavigationTabType.BATCH) ?
                        'activeIconFill' : 'defaultIconFill'}/>}/>
      <CommonTabLogic handleTabClick={handleTabClick}
                      isActive={isActive}
                      activeTab={NavigationTabType.SEARCH}
                      children={<SearchIcon className={isActive(NavigationTabType.SEARCH) ?
                        'activeIconFill' : 'defaultIconFill'}/>}/>
      <CommonTabLogic handleTabClick={handleTabClick}
                      isActive={isActive}
                      activeTab={NavigationTabType.SETTINGS}
                      children={<SettingsIcon className={isActive(NavigationTabType.SETTINGS) ?
                        'activeIconFill' : 'defaultIconFill'}/>}/>
    </ul>
  );
}
