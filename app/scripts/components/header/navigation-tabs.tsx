import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ResetInspectedElementAction} from '../../redux/reducers/inspected-element/inspected-element.actions';
import {NavigateAction} from '../../redux/reducers/navigation/navigation.actions';
import {RootState} from '../../redux/store';
import {CommonTabLogic} from '../tab-icons/commonTabLogic';
import './navigation-tabs.scss';
import '../../../styles/commonClasses.scss';
import { LogoutIcon } from '../tab-icons/logoutIcon';
import { UserActions } from '../../redux/reducers/user/user.actions';
import { NavigationTabType as NavType } from './navigationTypes';
import { UserNavigationTabs } from './user-navigation-tabs';
import { AdminNavigationTabs } from './admin-navigation-tabs';
import { Checkbox } from '../checkbox/checkbox';
import { AppModeActions } from '../../redux/reducers/appMode/appMode.actions';

/**
 * Main navigation tabs
 */
export function NavigationTabs() {

  /**
   * Is current tab active
   */
  const isActive = (tabId: NavType) => useSelector((state: RootState) => state.navigation.tab) === tabId;
  const isAdminMode = () => useSelector((state: RootState) => state.appMode) === 'ADMIN';
  const isAdminRole = () => useSelector((state: RootState) => state.user.role.name) === 'ADMIN';

  const dispatch = useDispatch();

  /**
   * Function called on tab click
   * @param tab {NavigationTabType} determines which tab was clicked
   */
  const handleTabClick = (tab: NavType) => {
    dispatch({...new NavigateAction(tab)});
    // reset currentInspected Element on each manual navigation to inspector tab
    if (tab === NavType.INSPECTOR) {
      dispatch({...new ResetInspectedElementAction()});
    }
  };

  const logoutHandleClick = () => {
    const logoutAction: any = UserActions.USER_LOGOUT;
    dispatch({ type: logoutAction });
    localStorage.clear();
  };

  const generateNavTab = () => {
    if(isAdminRole()) {
      return isAdminMode()? <AdminNavigationTabs handleTabClick={handleTabClick} isActive={isActive} /> :
        <UserNavigationTabs handleTabClick={handleTabClick} isActive={isActive} />;
    }

    return <UserNavigationTabs handleTabClick={handleTabClick} isActive={isActive} />;
  };

  const changeModeHandler = () => {
    const isAdmin: any = isAdminMode();
    return isAdminRole() ? 
      <CommonTabLogic handleTabClick={() => {
          const action = isAdmin ? AppModeActions.USER_MODE : AppModeActions.ADMIN_MODE;
          dispatch({ type: action });
        }}
        isActive={isActive}
        activeTab={NavType.CHANGE_MODE}
        children={
          <><Checkbox checkedValue={isAdmin} count={0} /></>
        }/>
    : '';
  };

  return (
    <ul className="nav nav-pills d-flex justify-content-center" id="crisp-tabs">
      { changeModeHandler() }
      { generateNavTab() }
      <CommonTabLogic handleTabClick={logoutHandleClick}
                      isActive={isActive}
                      activeTab={NavType.LOG_OUT}
                      children={<LogoutIcon className={isActive(NavType.LOG_OUT) ?
                        'activeIconFill' : 'defaultIconFill'}/>}/>
    </ul>
  );
}
