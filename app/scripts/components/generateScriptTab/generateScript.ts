import { Store } from 'redux';
import { PatternType } from '../../patterns/pattern-interface';
import { GenerateDataActions } from '../../redux/reducers/generateDatas/generateData.actions';
import store, { RootState } from '../../redux/store';
import { STANDARD_VAR_NAMES } from '../../shared/standard-var-names';

export enum GenerateTypes {
  Actions = 'Actions',
  PageObjects = 'PageObjects'
}

export class GenerateScript {
  private static instance: any;
  private static store: Store<RootState> = store;

  constructor() {
    if(!GenerateScript.instance) {
      GenerateScript.instance = this;
    }

    return GenerateScript.instance;
  }

  private getDataFromStore(pathString: string = '') {
    const storeState: any = GenerateScript.store.getState();

    if(pathString) {
      const pathList = pathString.split('.');
      let data = storeState;

      pathList.forEach((path: string) => data = data[path]);
      return data;
    }

    return storeState;
  }

  private findElementById(data: any, id: string) {
    return data.find(
      (item: any) => (item?._id||item?.id) === id
    );
  }

  private generateScript (
    element: any,
    options: any,
    parentOptions: {[key: string]: any}
  ): any | undefined {
    const storage: any = this.getDataFromStore('storage');

    const foundPattern = this.findElementById(storage.patterns, options.id);
    const elementPage = this.findElementById(storage.pages, element.page);

    if (foundPattern) {
      let elementVariables: any = {
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

      let scriptArguments: any = {};
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

  private getElementScripts(elements: any[], useSeparationLines: boolean): {
    actionScriptsData: any[];
    poScriptsData: any[];
  } {
    const actionScriptsData: any[] = [];
    const poScriptsData: any[] = [];
    const storage: any = this.getDataFromStore('storage');

    let previousElementPage: string = '';

    const addSeparationLine = (scripts: any[], element: any) => { // adding separation line with page name
      if (useSeparationLines && (!scripts.length || element.page !== previousElementPage)) {
        const elementPage = this.findElementById(storage.pages, element.page);
        const separationLine = `// page ${elementPage?.name}`;
        actionScriptsData.push({script: separationLine});
        poScriptsData.push({script: separationLine});
        previousElementPage = element.page;
      }
    };

    for (let element of elements) {
      const parentOptions: {[key: string]: any} = {};
      const parentElement = element.parentElement ? this.findElementById(storage.elements, element.parentElement) : undefined;

      if (parentElement) {
        const parentElementPage = this.findElementById(storage.pages, element.page);
        parentOptions[STANDARD_VAR_NAMES.PARENT_ELEMENT_NAME] = parentElement.name;
        parentOptions[STANDARD_VAR_NAMES.PARENT_ELEMENT_PAGE] = parentElementPage?.name;
        parentOptions[STANDARD_VAR_NAMES.PARENT_ELEMENT_DESCRIPTION] = parentElement.description;
        parentOptions[STANDARD_VAR_NAMES.PARENT_ELEMENT_ID] = parentElement.selectors.elementId;
        parentOptions[STANDARD_VAR_NAMES.PARENT_ELEMENT_CSS] = parentElement.selectors.elementCss;
        parentOptions[STANDARD_VAR_NAMES.PARENT_ELEMENT_XPATH] = parentElement.selectors.elementXPath;
      }

      if (element.pageObjectPattern) { // PO pattern
        const scriptData = this.generateScript(element, element.pageObjectPattern, parentOptions);
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
        const scriptData = this.generateScript(element, option, parentOptions);
        if (scriptData) {
          addSeparationLine(actionScriptsData, element);
          actionScriptsData.push(scriptData);
        }
      }
    }

    return {actionScriptsData, poScriptsData};
  }

  private generateScriptForElements(elements: any, useSeparationLines = false) {
    const { actionScriptsData, poScriptsData } = this.getElementScripts(elements, useSeparationLines);

    return {
      actionScriptsData: actionScriptsData || [],
      poScriptsData: poScriptsData || []
    };
  };

  private handleGenerateScript(): {
    actionScriptsData: any;
    poScriptsData: any;
  } {
    const storeState: any = this.getDataFromStore();

    const selectedProjectId = storeState.selectedProjectId;
    const selectedPageId = storeState.selectedPageId;
    const storage = storeState.storage;

    const project = this.findElementById(storage.projects, selectedProjectId);

    const page = this.findElementById(storage.pages, selectedPageId);

    if(!(project && page)) return {
      actionScriptsData: '',
      poScriptsData: ''
    };

    const pageIds = storage.pages.map((pg: any) => (pg.id||pg._id));

    const elements = storage.elements.filter(
      (el: any) => el.page === selectedPageId
      // currentPageOnly ? el.page === currentPage : pageIds.includes(el.page)
    ).sort(
      (el1: any, el2: any) => pageIds.indexOf(el1.page) - pageIds.indexOf(el2.page)
    );

    return this.generateScriptForElements(elements, true);

    // const patterns = storage.patterns;
    // setElementsForScript({elements, useSeparationLines: true});
  }

  private getActiveTextarea(): HTMLInputElement {
    return document.querySelector('#generate .tab-content > .active [data-for="generated-code"]') as HTMLInputElement;
  }

  private updateInputElement (
    scriptData: any[],
    value: string,
    area: HTMLInputElement
    // setValue: (v: string) => void,
  ): void {
    const {selectionStart, selectionEnd} = area;
    const valueToInsert: string = scriptData.map(({script}) => script).join('\n');
    const start = value.slice(0, selectionStart || 0);
    const end = value.slice(selectionEnd || 0, value.length);
    // setValue(`${start}${valueToInsert}\n${end}`);
    area.focus();
    setTimeout(() => {
      area.selectionEnd = `${start}${valueToInsert}\n`.length;
    });
  }

  public generateAndInputElementToScripts({element, area}: {element: any | null; area: HTMLInputElement}): void {
    if (element) {
      const { actionScriptsData, poScriptsData } = this.getElementScripts([element], false);
      // const area = this.getActiveTextarea();
      const storeState: any = GenerateScript.store.getState();
      const {pageObjects, testActions} = storeState.generatedDatas;

      const _pageObjects = this.updateInputElement(poScriptsData, pageObjects, area);
      const _testActions = this.updateInputElement(actionScriptsData, testActions, area);

      this.dispatch({
        type: GenerateDataActions.GENERATE_AND_INSERT_ALL,
        payload: {
          pageObjects: _pageObjects,
          testActions: _testActions
        }
      });
    }
  }

  private dispatch(data: any) {
    GenerateScript.store.dispatch(data);
  }

  public generateDataScripts(): void {
    const data = this.handleGenerateScript();
    this.dispatch({
      type: GenerateDataActions.GENERATE_ALL,
      payload: {
        pageObjects: data.poScriptsData.map((item: any) => item.script).join('\n'),
        testActions: data.actionScriptsData.map((item: any) => item.script).join('\n')
      }
    });
  }
};