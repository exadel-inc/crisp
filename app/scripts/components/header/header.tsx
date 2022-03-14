import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { elementsService, projectsService } from '../../shared/services';
import { NavigationTabs, NavigationTabType } from './navigation-tabs';

/**
 * Application Header
 */
export function Header () {

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
      case NavigationTabType.MAIN: return 'Elements';
      case NavigationTabType.SETTINGS: return 'Settings';
      case NavigationTabType.BATCH: return 'Add elements in bulk';
      case NavigationTabType.INSPECTOR: return isEditMode ? 'Edit element' : 'Add element';
      default: return '';
    }
  });

  return (
    <header>
      <div className="container">
        <div className="row">
          <div className="col project-name-container">
            <span>Project: </span>
            <span className="project-name">{projectName}</span>
          </div>
          <div className="col d-flex align-items-center">
            <div id="crisp-title" className="text-center flex-fill">{title}</div>
          </div>
          <div className="col-4">
            <NavigationTabs />
          </div>
        </div>
      </div>
    </header>
  );
};