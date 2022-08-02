import * as React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {elementsService, projectsService} from '../../shared/services';
import {NavigationTabs} from './navigation-tabs';
import {LogoComponent} from '../logoComponent/logoComponent';
import '../../componentPages/projectPage/projectPage.scss';
import {NavigationTabType as NavType} from './navigationTypes';

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
    const currentTab: NavType = state.navigation.tab;
    switch (currentTab) {
      case NavType.MAIN:
        return 'Elements';
      case NavType.PAGE:
        return 'Pages';
      case NavType.FRAMEWORK:
        return 'Frameworks';
      case NavType.PATTERN:
        return 'Patterns';
      case NavType.PROJECT:
        return 'Projects';
      case NavType.ACTION:
        return 'Actions';
      case NavType.BATCH:
        return 'Add elements in bulk';
      case NavType.INSPECTOR:
        return isEditMode ? 'Edit element' : 'Add element';
      default:
        return '';
    }
  });

  return (
    <header>
      <div>
        <div className="nav-logo-wrapper">
          <LogoComponent/>
          <NavigationTabs/>
        </div>
      </div>
    </header>
  );
}
