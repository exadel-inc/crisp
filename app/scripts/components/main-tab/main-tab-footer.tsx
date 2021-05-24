import * as React from 'react';
import { useEffect, useState } from 'react';
import { CrispElement } from '../../elements/element';
import { ElementPatternData } from '../../elements/element-selectors-interface';
import { PatternType, ScriptArguments } from '../../patterns/pattern-interface';
import { elementsService, pagesService, patternService } from '../../shared/services';
import { STANDARD_VAR_NAMES } from '../../shared/standard-var-names';

interface ScriptData {
  script: string;
  type?: PatternType;
  elementId?: string;
}

/**
 * Main tab footer
 * @param elementsData elements data that are used for script generating
 * @param onClear {Function} function called on clear script button click
 * @param onGenerate {Function} function called on generate buttons click
 */
export function MainTabFooter ({elementsData, addElement, onClear, onGenerate}: {
  elementsData: {
    elements: CrispElement[];
    useSeparationLines: boolean
  },
  addElement: {element: CrispElement | null};
  onClear: () => void,
  onGenerate: (currentPageOnly: boolean) => void,
}) {

  /**
   * component state: action pattern scripts
  */
  const [actionScripts, setActionScripts] = useState('');

  /**
   * component state: page object pattern scripts
  */
  const [pageObjectScripts, setPageObjectScripts] = useState('');

  /**
   * generates page object and action scripts for provided elements
   * @param elements {CrispElement[]} elements for output genereation
   * @param useSeparationLines {boolean} Insert separation lines between elements of different pages
  */
  const getElementScripts = (elements: CrispElement[], useSeparationLines: boolean): {
    actionScriptsData: ScriptData[],
    poScriptsData: ScriptData[],
  } => {
    const actionScriptsData: ScriptData[] = [];
    const poScriptsData: ScriptData[] = [];

    let previousElementPage: string = '';

    const addSeparationLine = (scripts: ScriptData[], element: CrispElement) => { // adding separation line with page name
      if (useSeparationLines && (!scripts.length || element.page !== previousElementPage)) {
        const elementPage = pagesService.findById(element.page);
        const separationLine = `// page ${elementPage?.name}`;
        actionScriptsData.push({script: separationLine});
        poScriptsData.push({script: separationLine});
        previousElementPage = element.page;
      }
    };

    for (let element of elements) {
      const parentOptions: {[key: string]: any} = {};
      const parentElement = element.parentElement ? elementsService.findById(element.parentElement) : undefined;
      if (parentElement) {
        const parentElementPage = pagesService.findById(element.page);
        parentOptions[STANDARD_VAR_NAMES.PARENT_ELEMENT_NAME] = parentElement.name;
        parentOptions[STANDARD_VAR_NAMES.PARENT_ELEMENT_PAGE] = parentElementPage?.name;
        parentOptions[STANDARD_VAR_NAMES.PARENT_ELEMENT_DESCRIPTION] = parentElement.description;
        parentOptions[STANDARD_VAR_NAMES.PARENT_ELEMENT_ID] = parentElement.selectors.elementId;
        parentOptions[STANDARD_VAR_NAMES.PARENT_ELEMENT_CSS] = parentElement.selectors.elementCss;
        parentOptions[STANDARD_VAR_NAMES.PARENT_ELEMENT_XPATH] = parentElement.selectors.elementXPath;
      }

      if (element.pageObjectPattern) { // PO pattern
        const scriptData = generateScript(element, element.pageObjectPattern, parentOptions);
        if (scriptData) {
          // add PO pattern script only once
          const isDuplicate: boolean = !!poScriptsData.find(script => script.type === PatternType.PAGE_OBJECT && script.elementId === element.id);
          if (!isDuplicate) {
            addSeparationLine(poScriptsData, element);
            poScriptsData.push(scriptData);
          }
        }
      }

      for (let option of element.actionPatterns) { // action patterns
        const scriptData = generateScript(element, option, parentOptions);
        if (scriptData) {
          addSeparationLine(actionScriptsData, element);
          actionScriptsData.push(scriptData);
        }
      }
    }

    return {actionScriptsData, poScriptsData};
  }

  /**
   * generate output for provided elements
   * @param elements {CrispElement[]} elements for output genereation
   * @param useSeparationLines {boolean} Insert separation lines between elements of different pages
  */
  const generateScriptForElements = (elements: CrispElement[], useSeparationLines: boolean = false): void => {
    const { actionScriptsData, poScriptsData } = getElementScripts(elements, useSeparationLines)

    setActionScripts(actionScriptsData.map(({script}) => script).join('\n'));
    setPageObjectScripts(poScriptsData.map(({script}) => script).join('\n'));
  };

  /**
   * Returns generated script for current element
   * @param element {CrispElement} element for script output genereation
   * @param options {ElementPatternData} additional data for script generation
   * @param parentOptions: {[key: string]: any} parent element data
  */
  const generateScript = (
    element: CrispElement,
    options: ElementPatternData,
    parentOptions: {[key: string]: any}
  ): ScriptData | undefined => {
    const foundPattern = patternService.findById(options.id);
    const elementPage = pagesService.findById(element.page);

    if (foundPattern) {
      let elementVariables: ScriptArguments = {
        ...element.selectors,
        ...options.customVars,
        elementName: element.name,
        elementPage: elementPage?.name,
        elementDescription: element.description,
        ...parentOptions,
      };

      // using loop because of destructuring above
      for (let key in elementVariables) {
        elementVariables[key] = elementVariables[key] || '';
      }

      let scriptArguments: ScriptArguments = {};
      for (let varName of foundPattern.getVarNames()) {
        scriptArguments[varName] = elementVariables[varName];
      }

      const script = foundPattern.getScript(scriptArguments);
      const type = foundPattern.type;
      const elementId = element.id;
      return { script, type, elementId };
    } else {
      return;
    }
  };

  /**
   * Handler of the "Copy" button click
  */
  const copyGeneratedLog = (): void => {
    /* Get the text field */
    getActiveTextarea().select();
    document.execCommand('copy');
  };

  /**
   * Returns active textarea
  */
  const getActiveTextarea = (): HTMLInputElement => {
    return document.querySelector('#generate .tab-content > .active [data-for="generated-code"]') as HTMLInputElement;
  };

  /**
   * Adds a line of script to the corresponding textarea
   * @param element {CrispElement} element for script output genereation
  */
  const addElementToScript = ({element}: {element: CrispElement | null}): void => {
    if (element) {
      const { actionScriptsData, poScriptsData } = getElementScripts([element], false);
      const area = getActiveTextarea();
      const areaType = area?.getAttribute('data-type');

      switch (areaType) {
        case 'page-objects': {
          updateInputElement(poScriptsData, pageObjectScripts, area, setPageObjectScripts);
          break;
        }
        case 'test-actions': {
          updateInputElement(actionScriptsData, actionScripts, area, setActionScripts);
          break;
        }
        default: break;
      }
    }
  }

  /**
   * Inserts a chunk of text into textarea, handles selection and final cursor position
   * @param scriptData {ScriptData[]} data with generated script
   * @param value {string} old input value
   * @param area {HTMLInputElement} corresponding textarea
   * @param setValue {Function} set value function
  */
  const updateInputElement = (
    scriptData: ScriptData[],
    value: string,
    area: HTMLInputElement,
    setValue: (v: string) => void,
  ): void => {
    const {selectionStart, selectionEnd} = area;
    const valueToInsert: string = scriptData.map(({script}) => script).join('\n');
    const start = value.slice(0, selectionStart || 0);
    const end = value.slice(selectionEnd || 0, value.length);
    setValue(`${start}${valueToInsert}\n${end}`);
    area.focus();
    setTimeout(() => {
      area.selectionEnd = `${start}${valueToInsert}\n`.length;
    });
  }

  /**
   * Adds new script line on each addElement update
  */
  useEffect(() => {addElementToScript(addElement)}, [addElement]);

  /**
   * Generates script on each elementsData update
  */
  useEffect(() => {generateScriptForElements(elementsData.elements, elementsData.useSeparationLines)}, [elementsData]);

  /**
   * Update the 'pageObjectScripts' state changed from UI
   * @param event {React.ChangeEvent<HTMLTextAreaElement>} - data of the 'change' event
   */
  const handleChangePageObjectScripts = (event: React.ChangeEvent<HTMLTextAreaElement> ): void => {
    let pageObjectScripts = event.target.value || '';
    setPageObjectScripts(pageObjectScripts);
  }

  /**
   * Update the 'actionScripts' state changed from UI
   * @param event {React.ChangeEvent<HTMLTextAreaElement>} - data of the 'change' event
   */
  const handleChangeActionScripts = (event: React.ChangeEvent<HTMLTextAreaElement> ): void => {
    let actionScripts = event.target.value || '';
    setActionScripts(actionScripts);
  }

  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col d-flex justify-content-center">
            <button id="btn-generate-page"
              type="button"
              className="btn btn-sm btn-primary btn-block"
              onClick={() => onGenerate(true)}
            >Generate for page</button>
          </div>
          <div className="col d-flex justify-content-center">
            <button id="btn-generate-all"
              type="button"
              className="btn btn-sm btn-primary btn-block"
              onClick={() => onGenerate(false)}
            >Generate for all pages</button>
          </div>
        </div>
      </div>

      <div id="generate">
        <ul className="nav nav-tabs mt-3">
          <li className="nav-item">
            <a className="nav-link active" data-toggle="tab" href="#main-objects">Page Objects</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="tab" href="#main-actions">Test Actions\Verifications</a>
          </li>
        </ul>
        <div className="container">
          <div className="tab-content mt-3">
            <div className="tab-pane fade show active" id="main-objects">
              <div className="form-group">
                <textarea className="form-control form-control-sm"
                  rows={6}
                  data-for="generated-code"
                  data-type="page-objects"
                  value={pageObjectScripts}
                  onChange={handleChangePageObjectScripts}
                ></textarea>
              </div>
            </div>

            <div className="tab-pane fade" id="main-actions">
              <div className="form-group">
                <textarea className="form-control form-control-sm"
                  rows={6}
                  data-for="generated-code"
                  data-type="test-actions"
                  value={actionScripts}
                  onChange={handleChangeActionScripts}
                ></textarea>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col d-flex justify-content-center">
              <div className="mx-1">
                <button id="btn-copy"
                  type="button"
                  className="btn px-4 btn-sm btn-primary"
                  onClick={copyGeneratedLog}
                >
                  <span>Copy</span>
                  <svg className="bi bi-clipboard" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                    <path fillRule="evenodd" d="M9.5 1h-3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
                  </svg>
                </button>
              </div>
              <div className="mx-1">
                <button id="btn-script-clear"
                  type="button"
                  className="btn px-4 btn-sm btn-outline-primary"
                  onClick={() => onClear()}
                >
                  <span>Clear</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
                    <path fillRule="evenodd" d="M16 1.75V3h5.25a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5H8V1.75C8 .784 8.784 0 9.75 0h4.5C15.216 0 16 .784 16 1.75zm-6.5 0a.25.25 0 01.25-.25h4.5a.25.25 0 01.25.25V3h-5V1.75z"></path>
                    <path d="M4.997 6.178a.75.75 0 10-1.493.144L4.916 20.92a1.75 1.75 0 001.742 1.58h10.684a1.75 1.75 0 001.742-1.581l1.413-14.597a.75.75 0 00-1.494-.144l-1.412 14.596a.25.25 0 01-.249.226H6.658a.25.25 0 01-.249-.226L4.997 6.178z"></path><path d="M9.206 7.501a.75.75 0 01.793.705l.5 8.5A.75.75 0 119 16.794l-.5-8.5a.75.75 0 01.705-.793zm6.293.793A.75.75 0 1014 8.206l-.5 8.5a.75.75 0 001.498.088l.5-8.5z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};