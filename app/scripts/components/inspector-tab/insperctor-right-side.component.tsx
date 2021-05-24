import * as React from 'react';
import { useSelector } from 'react-redux';
import { CrispElement } from '../../elements/element';
import { ElementPatternData } from '../../elements/element-selectors-interface';
import { PatternType } from '../../patterns/pattern-interface';
import { patternService, projectsService } from '../../shared/services';
import { ActionListComponent } from '../action-list/action-list.component';
import { Select, SelectOption } from '../shared/select/select.component';

/**
 * Inspector right side: page object pattern, action pattern list
 * @param element {CrispElement} current edited element
 * @param onChange {Function} function called on current element change
 */
export function InspectorRightSide ({ element, onChange }: {
  element: CrispElement;
  onChange: (element: CrispElement) => void;
}) {

  /**
   * Page object patterns from storage
   */
  const pageObjectPatterns = useSelector(() => patternService.getMany(PatternType.PAGE_OBJECT, projectsService.currentProject?.framework));

  /**
   * Function called on elements action patterns list change
   * @param actionPatterns {ElementPatternData} new element action patterns data
  */
  const handleElementActionPatternsChange = (actionPatterns: ElementPatternData[]): void => {
    element.actionPatterns = actionPatterns;
    onChange(element);
  };

  /**
   * Function called on elements page object pattern change
   * @param option {SelectOption} selected page object pattern data
  */
  const handleElementPoPatternChange = (option: SelectOption | null): void => {
    if (option) {
      (element.pageObjectPattern as ElementPatternData).id = option.id;
    } else {
      element.pageObjectPattern = option;
    }
    onChange(element);
  };

  return (
    <div className="col-4">
      <div className="row">
        <div className="col">
          <div className="form-group mb-2">
            <Select
              value={element.pageObjectPattern?.id}
              options={pageObjectPatterns}
              onChange={(option) => handleElementPoPatternChange(option)}
              settings={{
                label: {
                  label: 'Page object pattern',
                  className: 'mb-1',
                },
                firstOption: {
                  label: 'None',
                  enabled: true,
                },
                id: 'inspector-page-objects',
                className: 'form-control-sm',
              }}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <label className="mb-1">Actions\Verifications</label>
          <ActionListComponent
            element={element}
            onChange={(actionPatterns: ElementPatternData[]) => handleElementActionPatternsChange(actionPatterns)}
          />
        </div>
      </div>
    </div>
  );
};