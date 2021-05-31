import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { CrispElement } from '../../elements/element';
import { DEFAULT_PO_PATTERN } from '../../patterns/standard-patterns';
import { ResetInspectedElementAction, SetInspectedElementAction } from '../../redux/reducers/inspected-element/inspected-element.actions';
import { NavigateAction } from '../../redux/reducers/navigation/navigation.actions';
import { RootState } from '../../redux/store';
import { elementsService, pagesService, patternService, projectsService } from '../../shared/services';
import { NavigationTabType } from '../header/navigation-tabs';

import { ApiInspector } from './api-inspector.component';

import { showToast } from '../shared/toasts-component';

/**
 * Inspector tab
 */
export function ApiInspectorTab () {

  /**
   * Is current tab active
  */
  const isActive: boolean = useSelector((state: RootState) => state.navigation.tab) === NavigationTabType.API_INSPECTOR;

  return isActive ? (
    <div className={`tab-pane fade show ${isActive ? 'active' : ''}`} id="api-inspector">
      <ApiInspector
      />
    </div>
  ) : null;
};
