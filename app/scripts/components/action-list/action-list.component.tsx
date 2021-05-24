import * as React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CrispElement } from '../../elements/element';
import { ElementPatternData } from '../../elements/element-selectors-interface';
import { Pattern } from '../../patterns/pattern';
import { PatternType } from '../../patterns/pattern-interface';
import { patternService, projectsService } from '../../shared/services';
import { ActionListItem, CustomVars } from './action-list.interface';
import { ActionPatternListItem } from './action-pattern-list-item.component';

/**
 * Action patterns list
 * @param element {CrispElement} an element used to init checked patterns with variables list
 * @param onChange {Function} a callback function to be called on patterns list change
 */
export function ActionListComponent ({element, onChange}: {element: CrispElement, onChange: (list: ElementPatternData[]) => void}) {

  /**
   * Component state: current element
  */
  const [ processedElement, setProcessedElement ] = useState(element);

  /**
   * Sorts the actions list (selected actions at the top)
  */
  const sortList = (list: ActionListItem[]): ActionListItem[] => {
    return list.sort((prevPat, nextPat) => Number(nextPat.checked) - Number(prevPat.checked));
  }

  /**
   * Generates list in ActionListItem format
  */
  const generateList = (actionPatterns: Pattern[]): ActionListItem[] => {
    return sortList(actionPatterns
      .map(pattern => ({
        pattern,
        checked: !!processedElement.actionPatterns.find(pt => pt.id === pattern.id)
      })));
  };

  /**
   * Action patterns from storage
  */
  const actions = useSelector(() => patternService.getMany(PatternType.ACTION, projectsService.currentProject?.framework));

  /**
   * Component state: actions list
  */
  const [actionPatterns, setActionPatterns] = useState(generateList(actions));

  /**
   * Reset processedElement on input element change
  */
  useEffect(() => setProcessedElement(element), [element]);

  /**
   * Reset selected actions list on processedElement element change
  */
  useEffect(() => setActionPatterns(generateList(actions)), [processedElement]);

  /**
   * Component state: list filter string
  */
  const [filterStr, setFilterStr] = useState('');

  /**
   * Function called on list item select
   * @param item {ActionListItem} selected list item
   * @param customVars {CustomVars} custom variables used in action pattern
  */
  const handleItemSelect = (item: ActionListItem, customVars: CustomVars): void => {
    const newPatterns = actionPatterns.map(actionPattern => item.pattern.id === actionPattern.pattern.id ? item : actionPattern);
    setActionPatterns(newPatterns);
    const newActionPatterns: ElementPatternData[] = newPatterns.filter(listItem => listItem.checked)
      .map(listItem => listItem.pattern)
      .map((pattern: Pattern) => {
        if (pattern.id === item.pattern.id) {
          return {
            id: item.pattern.id,
            customVars
          }
        }
        return processedElement.actionPatterns.find(patData => patData.id === pattern.id) as ElementPatternData;
      })
    processedElement.actionPatterns = newActionPatterns;
    setProcessedElement(processedElement);
    onChange(processedElement.actionPatterns);
  }

  /**
   * Function called on action pattern custom variables change
   * @param patternId {string} a pattern id which custom variables are being changed
   * @param customVars {CustomVars} custom variables used in action pattern
  */
  const handleCustomVarChange = (patternId: string, customVars: CustomVars) => {
    processedElement.actionPatterns.forEach((patData: ElementPatternData) => {
      if (patData.id === patternId) {
        Object.keys(customVars).forEach((customVarKey: string) => patData.customVars[customVarKey] = customVars[customVarKey]);
      }
    })
    setProcessedElement(processedElement);
    onChange(processedElement.actionPatterns);
  }

  return (
    <div className="overflow-auto border-bottom position-relative">
      <input type="text"
        className="form-control form-control-sm search-actions sticky-top"
        placeholder="Search actions"
        onChange={(event) => setFilterStr(event.target.value)}
      />
      <ul className="list-group actions-list-group">
        {sortList(actionPatterns)
          .filter(actionPattern => actionPattern.pattern.name.includes(filterStr))
          .map(actionPattern => {
            const customVars = processedElement.actionPatterns.find(pt => pt.id === actionPattern.pattern.id)?.customVars
            return (
              <ActionPatternListItem
                key={actionPattern.pattern.id}
                pattern={actionPattern.pattern}
                isChecked={actionPattern.checked}
                customVars={customVars || {}}
                onSelect={(item, customVars) => handleItemSelect(item, customVars)}
                onCustomVarChange={(customVars: CustomVars) => handleCustomVarChange(actionPattern.pattern.id, customVars)}
              />
            );
          }
        )}
      </ul>
    </div>
  );
};

