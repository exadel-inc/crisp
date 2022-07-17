import * as React from 'react';
import {ProjectIcon} from '../tab-icons/projectIcon';
import {FrameworkIcon} from '../tab-icons/frameworkIcon';
import {CommonTabLogic} from '../tab-icons/commonTabLogic';
import {SearchIcon} from '../tab-icons/searchIcon';
import './navigation-tabs.scss';
import '../../../styles/commonClasses.scss';
import { NavigationTabType as NavType } from './navigationTypes'

/**
 * Main navigation tabs
 */
export function AdminNavigationTabs({handleTabClick, isActive}: {
  handleTabClick: any;
  isActive: any;
}) {
  return (
    <>
      <CommonTabLogic handleTabClick={handleTabClick}
                      isActive={isActive}
                      activeTab={NavType.PAGE}
                      children={<ProjectIcon className={isActive(NavType.PROJECT) ?
                        'activeIconFill' : 'defaultIconFill'
                      }/>}/>
      <CommonTabLogic handleTabClick={handleTabClick}
                      isActive={isActive}
                      activeTab={NavType.FRAMEWORK}
                      children={<FrameworkIcon className={isActive(NavType.FRAMEWORK) ?
                        'activeIconFill' : 'defaultIconFill'}/>}/>
      <CommonTabLogic handleTabClick={handleTabClick}
                      isActive={isActive}
                      activeTab={NavType.USER_MANAGER}
                      children={<SearchIcon className={isActive(NavType.USER_MANAGER) ?
                        'activeIconFill' : 'defaultIconFill'}/>}/>
    </>
  );
}