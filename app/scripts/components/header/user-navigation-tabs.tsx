import * as React from 'react';
import {AddIcon} from '../tab-icons/addIcon';
import {AddBulkIcon} from '../tab-icons/addBulkIcon';
import {CommonTabLogic} from '../tab-icons/commonTabLogic';
import {SearchIcon} from '../tab-icons/searchIcon';
import { NavigationTabType as NavType } from './navigationTypes';
import { HomeIcon } from '../tab-icons/homeIcon';

/**
 * Main navigation tabs
 */
export function UserNavigationTabs({handleTabClick, isActive}: {
  handleTabClick: any;
  isActive: any;
}) {
  return (
    <>
      <CommonTabLogic handleTabClick={handleTabClick}
        isActive={isActive}
        activeTab={NavType.MAIN}
        children={<HomeIcon className={isActive(NavType.MAIN) ?
          'activeIconFill' : 'defaultIconFill'}/>}/>
      <CommonTabLogic handleTabClick={handleTabClick}
        isActive={isActive}
        activeTab={NavType.ADD_ELEMENT}
        children={<AddIcon className={isActive(NavType.ADD_ELEMENT) ?
          'activeIconFill' : 'defaultIconFill'
        }/>}/>
      <CommonTabLogic handleTabClick={handleTabClick}
        isActive={isActive}
        activeTab={NavType.ADD_BULK}
        children={<AddBulkIcon className={isActive(NavType.ADD_BULK) ?
          'activeIconFill' : 'defaultIconFill'}/>}/>
      <CommonTabLogic handleTabClick={handleTabClick}
        isActive={isActive}
        activeTab={NavType.SEARCH}
        children={<SearchIcon className={isActive(NavType.SEARCH) ?
          'activeIconFill' : 'defaultIconFill'}/>}/>
    </>
  );
}
