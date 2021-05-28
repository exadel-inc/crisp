import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CrispElement } from '../../elements/element';
import { ElementPatternData } from '../../elements/element-selectors-interface';
import { Pattern } from '../../patterns/pattern';
import { SetInspectedElementAction } from '../../redux/reducers/inspected-element/inspected-element.actions';
import { NavigateAction } from '../../redux/reducers/navigation/navigation.actions';
import { elementsService, patternService } from '../../shared/services';
import { ActionListComponent } from '../action-list/action-list.component';
import { NavigationTabType } from '../header/navigation-tabs';

export interface PageElemementsProps {
  element: CrispElement;
  onAddElement: (element: CrispElement) => void;
  onRemoveElement: () => void;
}
/**
 * Element table row
 * @param element {CrispElement} corresponding Element
 * @param onAddElement {Function} function called on add element
 */
export function PageElemementsTableRow ({ element, onAddElement, onRemoveElement }: PageElemementsProps) {

  const dispatch = useDispatch();

  /**
   * Action patterns of current element from storage
   */
  const actionPatterns: Pattern[] = useSelector(() => element.actionPatterns
    .map(pattern => patternService.findById(pattern.id))
    .filter(pattern => !!pattern) as Pattern[]);

  /**
   * Page object pattern of current element from storage
   */
  const pageObjectPattern = useSelector(() => element.pageObjectPattern && patternService.findById(element.pageObjectPattern.id));

  /**
   * Function called on action list change element
   * @param element {CrispElement} corresponding element
   * @param actionPatterns {ElementPatternData[]} new action patterns list
  */
  const updateElement = (element: CrispElement, actionPatterns: ElementPatternData[]) => {
    element.actionPatterns = actionPatterns;
    elementsService.update(element.id, element);
  }

  /**
   * Function called on element add button click
  */
  const handleAddElementClick = () => {
    onAddElement(element);
  }

  /**
   * Component state: display actionList dropdown
  */
   const [displayActionList, setDisplayActionList] = useState(false);

  /**
   * Function called on element edit button click
   * dispatches cloned element to the store in order to avoid changing of existing element
  */
  const handleEditElementClick = () => {
    dispatch({...new SetInspectedElementAction(elementsService.clone(element))});
    dispatch({...new NavigateAction(NavigationTabType.INSPECTOR)});
  };

  /**
   * Function that renders action list component regarding of displayActionList property
  */
  const renderActionList = () => {

    // calculate the width of table columns
    const width: number = [1, 2, 3, 4]
      .map(num => document.getElementById(`page-elements-table-${num}`))
      .map(el => el?.clientWidth || 0)
      .reduce((acc, val) => acc + val);

    const style = {
      width: `${width - 10}px`
    }

    return displayActionList
    ? <div className="action-list-wrapper" data-key={element.id} style={style}>
        <ActionListComponent
          element={element}
          onChange={(actionPatterns: ElementPatternData[]) => updateElement(element, actionPatterns)}
        />
      </div>
    : null
  };

  /**
   * Close action list if the blur was because of outside focus
  */
  const handleBlur = (event: any) => {
    if (!event?.currentTarget?.contains(event.relatedTarget)) {
      setDisplayActionList(false)
    }
  }

  return (
    <tr className="crisp-element">
      <td scope="row">{element.name}</td>
      <td scope="row" className="extended-param">{pageObjectPattern?.name}</td>
      <td scope="col" className="extended-param">
        <div>{element.selectors.elementId ? `ID: ${element.selectors.elementId}` : ''}</div>
        <div>{element.selectors.elementCss ? `CSS: ${element.selectors.elementCss}` : ''}</div>
        <div>{element.selectors.elementXPath ? `xPath: ${element.selectors.elementXPath}` : ''}</div>
      </td>
      <td className="border-right-0">{
        actionPatterns.map((pattern: Pattern) => <div key={pattern.id}>{pattern.name}</div>)
      }</td>
      <td className="min border-left-0"
        onBlur={(event) => handleBlur(event)}
      >
        <div className="dropdown">
          <button className="btn btn-sm btn-outline-secondary dropdown-toggle element-control option-btn-actions"
            type="button"
            onClick={() => setDisplayActionList(!displayActionList)}
          >
            Edit
          </button>
          {renderActionList()}
        </div>
      </td>
      <td className="element-controls text-center">
        <button type="button"
          data-key={element.id}
          className="btn btn-white btn-sm element-control option-btn-add"
          onClick={() => handleAddElementClick()}
        >
          <span className="option-btn-icon"></span>
        </button>
        <button type="button"
          data-key={element.id}
          className="btn btn-white btn-sm element-control option-btn-edit"
          onClick={() => handleEditElementClick()}
        >
          <span className="option-btn-icon"></span>
        </button>
        <button type="button"
          data-key={element.id}
          className="btn btn-white btn-sm element-control option-btn-remove"
          onClick={onRemoveElement}
        >
          <span className="option-btn-icon"></span>
        </button>
      </td>
    </tr>
  );

};
