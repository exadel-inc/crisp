import * as React from 'react';
import {AddIcon} from '../tab-icons/addIcon';
import {AddBulkIcon} from '../tab-icons/addBulkIcon';
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
                      children={<AddIcon className={isActive(NavType.PAGE) ?
                        'activeIconFill' : 'defaultIconFill'
                      }/>}/>
      <CommonTabLogic handleTabClick={handleTabClick}
                      isActive={isActive}
                      activeTab={NavType.FRAMEWORK}
                      children={<AddBulkIcon className={isActive(NavType.FRAMEWORK) ?
                        'activeIconFill' : 'defaultIconFill'}/>}/>
      <CommonTabLogic handleTabClick={handleTabClick}
                      isActive={isActive}
                      activeTab={NavType.USER_MANAGER}
                      children={<SearchIcon className={isActive(NavType.USER_MANAGER) ?
                        'activeIconFill' : 'defaultIconFill'}/>}/>
    </>
  );
}
