import * as React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './multiselectComponent.scss';

enum STANDARD_VAR_NAMES {
  ELEMENT_NAME = 'elementName',
  ELEMENT_DESCRIPTION = 'elementDescription',
  ELEMENT_PAGE = 'elementPage',
  ELEMENT_ID = 'elementId',
  ELEMENT_CSS = 'elementCss',
  ELEMENT_XPATH = 'elementXPath',
  // same for parentElement
  PARENT_ELEMENT_NAME = 'parentElementName',
  PARENT_ELEMENT_DESCRIPTION = 'parentElementDescription',
  PARENT_ELEMENT_PAGE = 'parentElementPage',
  PARENT_ELEMENT_ID = 'parentElementId',
  PARENT_ELEMENT_CSS = 'parentElementCss',
  PARENT_ELEMENT_XPATH = 'parentElementXPath',
}

const getVarNames = (script: string, customOnly: boolean = false): string[] => {
  const matches = script.match(/(?<=\${).*?(?=\})/gim) || [];
  return matches
    .filter((val: string) => customOnly ? !Object.values(STANDARD_VAR_NAMES as any).includes(val) : true)
    .reduce((acc: string[], val: string) => {
      if (val && !acc.includes(val)) {
        acc.push(val);
      }
      return acc;
    }, []);
};

export const MultiselectComponent = (
  {
    elPatterns = [],
    onChangeMultiselect = () => {}
  }:
  {
    elPatterns: any[];
    onChangeMultiselect: Function;
  }
) => {
  const [ elementPatterns, setElementPatterns ] = useState(elPatterns);
  const [ filterStr, setFilterStr ] = useState('');

  const patterns = useSelector((store: any) => store?.storage?.patterns);

  useEffect(() => setElementPatterns(elPatterns), [elPatterns]);

  const sortList = (list: any[]): any[] => {
    return list.sort((prevPat, nextPat) => Number(nextPat.checked) - Number(prevPat.checked));
  };

  const generateList = (actionPatterns: any[]): any[] => {
    const findPattern = (pattern: any) => {
      return elementPatterns.some(
        (pt: any) => pt._id === pattern._id
      );
    };
    const patterns = actionPatterns.map(
      (pattern: any) => ({
        pattern,
        checked: findPattern(pattern)
      })
    );
    return sortList(patterns);
  };

  const generateCustomVariableTag = (variable: any, index: number, isChangabel: boolean = false, actionId: any) => {
    const id = variable._id || '';
    const name = variable.name || variable || '';
    const value = variable.value || '';
    return <div className="custom-variable"  key={'custom_variable_key_' + index} id={'custom_variable_' + id}>
      <div className="custom-variable-name">{name}</div>
      <input disabled={isChangabel} className="custom-variable-value" type="text" defaultValue={value} onChange={(e: any) => {
        if(isChangabel) return;
        const newElActionPAttern = elementPatterns.map((action: any) => {
          if(action._id === actionId) {
            return {
              ...action,
              customVars: {
                ...action.customVars,
                [name]: e.currentTarget.value
              }
            };
          }

          return action;
        });
        onChangeMultiselect(newElActionPAttern);
      }} />
    </div>;
  };

  // <button id="opneVariableWindow" onClick={() => {}}><span>?</span></button>
  const generateAttributeTag = (actionPattern: any, index: number) => {
    const customVariables = getVarNames(actionPattern.script || '', true) || [];

    const expandCVwrapper = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.stopPropagation();
      if(customVariables.length) {
        const els = document.getElementsByClassName('custom-variable show') || [];
        for(let i =0; i<els.length; ++i) {
          els[i].classList.add('show');
        }
        const element = document.getElementById('custom_' + actionPattern._id);
        if(element) {
          if(element.classList.contains('show')) {
            element.classList.remove('show');
          } else {
            element.classList.add('show');
          }
        }
      }
    };

    return <li className="pattern-attribute" key={actionPattern._id + index} id={actionPattern._id}>
      <div className='pattern-wrapper'>
        <input className='pattern-attribute-checkbox' type="checkbox" checked={actionPattern.checked}  onChange={(e: any) => {
          if(actionPattern.checked) {
            onChangeMultiselect(
              elementPatterns.filter((action: any) => {
                return action._id !== actionPattern._id;
              })
            );
          } else {
            onChangeMultiselect([
              ...elementPatterns,
              actionPattern
            ]);
          }
        }} />
        <div className="pattern-script">
          { actionPattern.script }
        </div>
        {
          customVariables.length ?
            <button className='config-variable-btn' onClick={expandCVwrapper}>
              <span className='btn-icon'></span>
            </button> : ''
        }
      </div>
      <div className="custom-variables" id={'custom_' + actionPattern._id}>
        {
          customVariables.map((variable: any, index: number) => {
            let variableObj = variable;
            const varName = variable.name || variable || '';
            if(actionPattern.customVars && varName && varName in actionPattern.customVars) {
              variableObj = {
                ...variable,
                value: actionPattern.customVars[varName] || ''
              };
            }

            return generateCustomVariableTag(variableObj, index, !actionPattern.checked || false, actionPattern._id);
          }) || ''
        }
      </div>
    </li>;
  };

  const filterPatterns = (attribute: any) => {
    const attrPattern = attribute ? attribute?.pattern?.name: '';
    return attrPattern.toLowerCase().includes( filterStr.toLowerCase() );
  };

  return (
    <div className="element-pattern-attributes-multiselect">
      <div className="pattern-attributes-filter">
        <input
          id="filter"
          type="text"
          defaultValue={filterStr}
          placeholder="Search actions"
          onChange={(event) => setFilterStr(event.target.value)} />
      </div>
      <div className="pattern-attributes-wrapper">
        <ul className="pattern-attributes">
          {
            generateList(patterns).filter(filterPatterns).map(
              (actionPattern: any, index: number) => generateAttributeTag(actionPattern.pattern, index)
            )
          }
        </ul>
      </div>
    </div>
  );
};
