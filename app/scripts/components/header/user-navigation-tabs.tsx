import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ResetInspectedElementAction} from '../../redux/reducers/inspected-element/inspected-element.actions';
import {NavigateAction} from '../../redux/reducers/navigation/navigation.actions';
import {RootState} from '../../redux/store';
import {AddIcon} from '../tab-icons/addIcon';
import {AddBulkIcon} from '../tab-icons/addBulkIcon';
import {CommonTabLogic} from '../tab-icons/commonTabLogic';
import {SearchIcon} from '../tab-icons/searchIcon';
import { NavigationTabType as NavType } from './navigationTypes'

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
