import * as React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {elementsService, projectsService} from '../../shared/services';
import {NavigationTabs, NavigationTabType} from './navigation-tabs';
import {Checkbox} from '../checkbox/checkbox';
import {SearchComponent} from '../searchComponent/searchComponent';
import {ProjectPanel} from '../projectPanel/projectPanel';

/**
 * Application Header
 */
export function Header() {

  /**
   * Current project name
   */
  const projectName = useSelector(() => projectsService.currentProject?.name);

  /**
   * Title displayed in header
   */
  const title: string = useSelector((state: RootState) => {
    const isEditMode: boolean = !!(state.inspectedElement && elementsService.findById(state.inspectedElement.id));
    const currentTab: NavigationTabType = state.navigation.tab;
    switch (currentTab) {
      case NavigationTabType.MAIN:
        return 'Elements';
      case NavigationTabType.SETTINGS:
        return 'Settings';
      case NavigationTabType.BATCH:
        return 'Add elements in bulk';
      case NavigationTabType.INSPECTOR:
        return isEditMode ? 'Edit element' : 'Add element';
      default:
        return '';
    }
  });

  return (
    <header>
      <div className="container">
        <div className="nav-logo-wrapper">
          <div>Logo</div>
          <NavigationTabs/>
        </div>
        <SearchComponent/>
        <Checkbox/>
        <div>
          <ProjectPanel projectName='Project001 web redisineskjnsdjknv' counter='2'/>
        </div>
      </div>
    </header>
  );
}
