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
import { InspectorFooter, InspectorFooterButtonType } from './inspector-footer.component';
import { InspectorLeftSide } from './inspector-left-side.component';
import { InspectorRightSide } from './insperctor-right-side.component';
import { showToast } from '../shared/toasts-component';

/**
 * Inspector tab
 */
export function InspectorTab () {

  const dispatch = useDispatch();

  /**
   * Component state: display fields validation
   */
  const [validated, setValidated] = useState(false);

  /**
   * Is current tab active
  */
  const isActive: boolean = useSelector((state: RootState) => state.navigation.tab) === NavigationTabType.INSPECTOR;

  /**
   * Inspector tab mode: edit current element or create new one
  */
  const isEditMode: boolean = useSelector((state: RootState) => {
    return !!(state.inspectedElement && elementsService.findById(state.inspectedElement.id))
  });

  /**
   * Returns new element with customized defaults
  */
  const generateNewElement = (): CrispElement => {
    const elementPages = pagesService.getMany(projectsService?.currentProject?.id);
    const currentFramework = projectsService?.currentProject?.framework;
    const defaultPattern = DEFAULT_PO_PATTERN ? patternService?.findById(DEFAULT_PO_PATTERN) : null;
    const elementPoPatternData = (defaultPattern && defaultPattern.framework === currentFramework) ? {
      customVars: {},
      id: defaultPattern.id,
    } : null;
    return new CrispElement('', '', elementPages[0]?.id, undefined, elementPoPatternData);
  }

  /**
   * Returns current inspected element. If no inspected element in store, dispatches new one.
  */
  const inspectedElement: CrispElement = useSelector((state: RootState) => {
    if (!state.inspectedElement) {
      const newElement = generateNewElement();
      dispatch({...new SetInspectedElementAction(newElement)});
      return newElement;
    }
    return state.inspectedElement;
  });

  /**
   * Reset validation on each element change
  */
  useEffect(() => setValidated(false), [inspectedElement])

  /**
   * Function called on current element change
   * @param element {CrispElement} element data
  */
  const handleElementChange = (element: CrispElement): void => {
    dispatch({...new SetInspectedElementAction(element)});
  }

  /**
   * Function called on footer button click
   * @param buttonType {InspectorFooterButtonType} footer button type
  */
  const handleFooterButtonClick = (buttonType: InspectorFooterButtonType): void => {
    switch (buttonType) {
      case InspectorFooterButtonType.SAVE: {
        // save or update
        const isFormValid = validateForm();
        if (isFormValid) {
          saveElement();
          dispatch({...new ResetInspectedElementAction()});
          dispatch({...new NavigateAction(NavigationTabType.MAIN)});
        }
        break;
      }
      case InspectorFooterButtonType.SAVE_AND_ADD_NEW: {
        // save or update
        const isFormValid = validateForm();
        if (isFormValid) {
          saveElement();
          dispatch({...new ResetInspectedElementAction()});
        }
        break;
      }
      case InspectorFooterButtonType.CANCEL: {
        dispatch({...new ResetInspectedElementAction()});
        dispatch({...new NavigateAction(NavigationTabType.MAIN)});
        break;
      }
      default: break;
    }
  }

  /**
   * Validates form and trigger to display validation results for each field 
   * Retruns form validity
  */
  const validateForm = (): boolean => {
    setValidated(true);
    setTimeout(() => setValidated(false), 1500);
    return !!(inspectedElement.page && inspectedElement.name);
  }

  /**
   * Saving element
  */
  const saveElement = (): void => {
    try {
      if (isEditMode) {
        // update existing
        const existingElement = elementsService.findById(inspectedElement.id);
        if (existingElement) {
          elementsService.update(existingElement.id, inspectedElement);
          console.log('updated: ', inspectedElement);
          showToast('Element was updated', 'success');
        }
      } else {
        // save new element
        const elementsArraySize: number = elementsService.getMany().length;
        elementsService.add(inspectedElement, elementsArraySize);
        console.log('saved: ', inspectedElement);
        showToast('Element was saved', 'success');
      }
    } catch (error) {
      const message = (error as Error).message;
      showToast(message, 'danger');
    };
  };

  return isActive ? (
    <div className={`tab-pane fade show ${isActive ? 'active' : ''} ${validated ? 'was-validated' : ''}`} id="inspector">
      <div className="container">
        <div className="row">
          <InspectorLeftSide
            element={inspectedElement}
            onChange={(element: CrispElement) => handleElementChange(element)}
          />
          <InspectorRightSide
            element={inspectedElement}
            onChange={(element: CrispElement) => handleElementChange(element)}
          />
        </div>
      </div>
      <InspectorFooter
        isEditMode={isEditMode}
        onButtonClick={(buttonType: InspectorFooterButtonType) => handleFooterButtonClick(buttonType)}
      />
    </div>
  ) : null;
};
