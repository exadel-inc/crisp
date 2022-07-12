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
import { LogoutIcon } from '../tab-icons/logoutIcon';
import { UserActions } from '../../redux/reducers/user/user.actions';

export enum NavigationTabType {
  MAIN = 'main',
  BATCH = 'batch',
  INSPECTOR = 'inspector',
  SETTINGS = 'settings',
  SEARCH = 'search',
  ADD_ELEMENT = 'addElement',
  ADD_BULK = 'addBulk',
  LOG_OUT = 'logout'
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

  const logoutHandleClick = () => {
    const logoutAction: any = UserActions.USER_LOGOUT;
    dispatch({ type: logoutAction });
    localStorage.clear();
  };

  return (
    <ul className="nav nav-pills d-flex justify-content-center" id="crisp-tabs">
      <CommonTabLogic handleTabClick={handleTabClick}
                      isActive={isActive}
                      activeTab={NavigationTabType.ADD_ELEMENT}
                      children={<AddIcon className={isActive(NavigationTabType.ADD_ELEMENT) ?
                        'activeIconFill' : 'defaultIconFill'
                      }/>}/>
      <CommonTabLogic handleTabClick={handleTabClick}
                      isActive={isActive}
                      activeTab={NavigationTabType.ADD_BULK}
                      children={<AddBulkIcon className={isActive(NavigationTabType.ADD_BULK) ?
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
      <CommonTabLogic handleTabClick={logoutHandleClick}
                      isActive={isActive}
                      activeTab={NavigationTabType.SETTINGS}
                      children={<LogoutIcon className={isActive(NavigationTabType.SETTINGS) ?
                        'activeIconFill' : 'defaultIconFill'}/>}/>
    </ul>
  );
}
