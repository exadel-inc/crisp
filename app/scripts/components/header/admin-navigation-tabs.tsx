import * as React from 'react';
import {ProjectIcon} from '../tab-icons/projectIcon';
import {FrameworkIcon} from '../tab-icons/frameworkIcon';
import {CommonTabLogic} from '../tab-icons/commonTabLogic';
import {AddAdminPatternIcon} from '../tab-icons/addAdminPatterns';
import './navigation-tabs.scss';
import '../../../styles/commonClasses.scss';
import { NavigationTabType as NavType } from './navigationTypes';
import { UserManagerIcon } from '../tab-icons/userManagerIcon';

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
        activeTab={NavType.PROJECT}
        children={<ProjectIcon className={isActive(NavType.PROJECT) ?
          'activeIconFill' : 'defaultIconFill'
        }/>}
        titleStr = 'Project'
      />
      <CommonTabLogic handleTabClick={handleTabClick}
        isActive={isActive}
        activeTab={NavType.FRAMEWORK}
        children={<FrameworkIcon className={isActive(NavType.FRAMEWORK) ?
          'activeIconFill' : 'defaultIconFill'}/>}
        titleStr = 'Framework'
      />
      <CommonTabLogic handleTabClick={handleTabClick}
        isActive={isActive}
        activeTab={NavType.ADMIN_PATTERN}
        children={<AddAdminPatternIcon className={isActive(NavType.ADMIN_PATTERN) ?
          'activeIconFill' : 'defaultIconFill'}/>}
        titleStr = 'Pattern'
      />
      <CommonTabLogic handleTabClick={handleTabClick}
        isActive={isActive}
        activeTab={NavType.USER_MANAGER}
        children={<UserManagerIcon className={isActive(NavType.USER_MANAGER) ?
          'activeIconFill' : 'defaultIconFill'}/>}
        titleStr = 'User manager'
      />
    </>
  );
}
