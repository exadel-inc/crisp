import * as React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/store';
import { SettingsFrameworkTabType } from './framework-navigation.component';
import { SettingsOptions, ISettingsOption } from '../options/options.component';

import { Pattern } from '../../../patterns/pattern';
import { PatternType } from '../../../patterns/pattern-interface';
import { Framework } from '../../../framework/framework';
import { patternService, projectsService } from '../../../shared/services';
import { saveOption, updateOption } from '../shared/option/save-option.utils';
import { duplicateOption } from '../shared/option/duplicate-option.utils';
import { removeOption } from '../shared/option/remove-option.utils';
import { SettingsActions } from '../../../redux/reducers/settings/settings.actions';
import { IOptionsFilter, filterOptions } from '../shared/utils';
import { ISelectOption, IEditorData } from '../shared/interfaces';
import { SelectComponent } from '../shared/select-component';
import { useConfirmModal } from '../../shared/confirm-modal/confirm-modal';
import { useImportModal } from '../../shared/import-modal/import-modal';
import { useExportModal } from '../../shared/export-modal/export-modal';
import { SettingsEntityType } from '../../../shared/settings-constants';
import { STANDARD_VAR_NAMES } from '../../../shared/standard-var-names';


/**
 * Local state of editor for an option
 */
interface IEditor extends IEditorData {
  id: string;
  type: PatternType;
  framework: string;
  script: string;
};

/**
 * Settings -> framework -> actions tab
*/
export function ActionsTab() {

  const dispatch = useDispatch();

  /**
   * create Import modal
  */
  const showImportModal = useImportModal();

  /**
   * create Export modal
  */
  const showExportModal = useExportModal();

  /**
   * create Confirm modal
  */
  const showConfirmModal = useConfirmModal();

  /**
   * Import button handler function
  */
  const handleImport = () => {
    showImportModal({entity: SettingsEntityType.ACTION_PATTERN});
  };

  /**
   * Export button handler function
  */
  const handleExport = () => {
    showExportModal({entity: SettingsEntityType.ACTION_PATTERN});
  };

  /**
   * Time to dispatching of filter changes
   */
  const TYPING_DELAY = 0;

  /**
   * Store the setTimeout function here to have possibility of canceling it
   */
  let typingTimer: any = null;

  /**
   * Unified way to use changing configurations for different tabs
   */
  const CONFIG = {
    tab: SettingsFrameworkTabType.ACTIONS,
    service: patternService,
    uniqueFields: ['type', 'framework'],
    requiredFields: ['name', 'type', 'framework', 'script'],
    actions: {
      edit: SettingsActions.EDIT_FRAMEWORK,
      filter: SettingsActions.FILTER_FRAMEWORK,
    },
    scriptDescription: `You can use the following standard variables in your Actions patterns:
      ${Object.values(STANDARD_VAR_NAMES as any).join(', ')} and any other custom variable names.`,
  }

  // get the the current framework from the Store
  const optionFramework = projectsService.currentProject?.framework || '';

  /**
   * Initial state of the editor
   */
  const editorInitState: IEditor = {
    id: '',
    name: '',
    type: PatternType.ACTION,
    framework: optionFramework,
    script: '',
  };

  // define setter of the editorData variable
  // we do not use Store here because of frequent changing of the editor's state
  let [editorData, setEitorData] = useState<IEditor>(editorInitState);


  /* Store handling */

  // true, if the tab is active
  const isActive = useSelector((state: RootState) => 
    state.settings.framework.tab) === SettingsFrameworkTabType.ACTIONS;

  // true at the option creating or editing mode
  const isEditing = useSelector((state: RootState) => state.settings.framework.actions.isEditing);

  // get options at every component rendering
  const options = useSelector( (state: RootState) => state.storage.patterns ) as ISettingsOption[];

  // get the data of the current options filter
  // { <optionKey>: <value for filtering> }
  let optionsFilter = useSelector((state: RootState) =>
    state.settings.framework.actions.filter) as IOptionsFilter;

  // get frameworks
  const frameworks = useSelector( (state: RootState) => state.storage.framework ) as Framework[];


  // initialize filter by framework
  if (!optionsFilter.framework) {
    // update filter state in store
    if (!isEditing) {
      dispatch({
        type: CONFIG.actions.filter,
        payload: { ...optionsFilter, framework: optionFramework },
        tab: CONFIG.tab,
      })
    }
  }

  // filtering options
  const filteredOptions = filterOptions(options, {
    ...optionsFilter,
    type: editorInitState.type,
  });

  // define setter of the "name" field of the tab
  let [optionName, setOptionName] = useState(optionsFilter.name || '');

  // get otpions for the framework <select> element
  // if there is no selected options, select the first one
  let frameworkSelectOptions: ISelectOption[] = [];
  if (frameworks.length) {
    if (!editorData.framework) {
      editorData = { ...editorData, framework: frameworks[0].id };
    }
    frameworkSelectOptions = frameworks.map( (framework: Framework): ISelectOption => {
      return {
        text: framework.name,
        value: framework.id,
      };
    } );
  }


  /**
   * Shows/hides the editor depending on the "state" argument
   * @param state {boolean}
   */
  const toggleEditing = (state: boolean): void => {
    dispatch({
      type: CONFIG.actions.edit,
      payload: state,
      tab: CONFIG.tab
    })
  };

  /**
   * Resets the editor's data to initial state with saving filtering params
   * @param hardReset {boolean} - if true, resets the name
   */
  const resetEditor = (hardReset: boolean = false): void => {
    if (hardReset) {
      // clear local name
      setOptionName('');

      // update filter state in store
      dispatch({
        type: CONFIG.actions.filter,
        payload: {
          ...optionsFilter,
          name: '',
          framework: editorData.framework,
        },
        tab: CONFIG.tab,
      })
    }

    // clear editor data
    setEitorData(editorInitState);
  };

  /**
   * Terminates the editing mode
   */
  const handleCancelEditing = (): void => {
    resetEditor();
    toggleEditing(false);
  };


  /* Handlers of changing the editor's fields */

  /**
   * Handles the "name" field changes
   * in the editing mode the name is set to the editor's data
   * in the reading mode the name is set as the component's local state variable to prevent
   * frequently dispatching to Store as filter option during typing
   * name as the filter option is dispatched after some delay
   * @param ev {any} DOM event data
   */
  const handleChangeName = (ev: any) => {
    // get name from event data
    const name = ev.target.value || '';

    // cancel delayed operation of dispatching the name as a filter option to Store
    clearTimeout(typingTimer);

    if (isEditing) {
      // update editor state
      setEitorData({ ...editorData, name, });
    } else {
      // update local name
      setOptionName(name);
    }

    // dispatch the name as a filter option to Store after some delay
    typingTimer = setTimeout( () => {
      // update filter state in store
      if (!isEditing) {
        dispatch({
          type: CONFIG.actions.filter,
          payload: { ...optionsFilter, name },
          tab: CONFIG.tab,
        })
      }
    } , TYPING_DELAY);
  };

  /**
   * Handles the "script" field changes of the editor
   * @param ev {any} DOM event data
   */
  const handleChangeScript = (ev: any) => {
    // update local state
    setEitorData({
      ...editorData,
      script: ev.target.value || ''
    });
  };

  /**
   * Handles the "framework" field changes of the editor
   * @param ev {any} DOM event data
   */
  const handleChangeFramework = (ev: any) => {
    // update local state
    setEitorData({
      ...editorData,
      framework: ev.target.value || ''
    });
  };

  /**
   * Handles changing the "framework" filter
   * @param ev {any} DOM event data
   */
  const handleChangeFrameworkFilter = (ev: any) => {
    const framework = ev.target.value || ''

    // update filter state in store
    if (!isEditing) {
      dispatch({
        type: CONFIG.actions.filter,
        payload: { ...optionsFilter, framework },
        tab: CONFIG.tab,
      })
    }
  };


  /* OPTION ACTIONS */

  /**
   * Handles the start of creating a new option
   * the name entered as filter is passed as an initial value of the option's name
   */
  const handleCreateOption = (): void => {
    // update editor data
    setEitorData({
      ...editorData,
      name: optionName,
      framework: optionsFilter.framework || optionFramework,
    });

    // display editor
    toggleEditing(true);
  };

  /**
   * Handles saving a new option
   * @param state {IEditor} current data of the editor
   */
  const handleSaveOption = (state: IEditor): void => {
    const callbackFn = () => {
      // reset the editor to the initial state
      resetEditor(true);
      // hide editor
      toggleEditing(false);
    };

    if (state.id) {
      // update existing option
      updateOption(state.id, {
        service: CONFIG.service,
        uniqueFields: CONFIG.uniqueFields,
        requiredFields: CONFIG.requiredFields,
        editorData: state,
      }, callbackFn);
    } else {
      // create a new option
      const pattern = new Pattern(state.type, state.framework, state.name, state.script);
      saveOption(pattern, {
        service: CONFIG.service,
        uniqueFields: CONFIG.uniqueFields,
        requiredFields: CONFIG.requiredFields,
      }, callbackFn);
    }
  };

  /**
   * Handles the start of editing an existing option
   * @param id {string} the id of the editing option
   */
  const handleEditOption = (id: string) => {
    // get an existing option
    const pattern = CONFIG.service.findById(id);

    if (pattern) {
      // update editor state
      setEitorData({
        id: pattern.id,
        name: pattern.name,
        type: pattern.type,
        framework: pattern.framework,
        script: pattern.script,
      });

      // switch to editing mode
      toggleEditing(true);
    }
  };

  /**
   * Handles duplicating an existing option
   * @param id {string} the id of the edited option
   */
  const handleDuplicateOption = (id: string) => {

    // the expression for creating a new instance of the duplicated option
    const create = (name: string, {framework, script}: Pattern) => new Pattern(
      PatternType.ACTION,
      framework,
      name,
      script
    );

    // duplicate operation
    duplicateOption(id, {
      service: CONFIG.service,
      uniqueFields: CONFIG.uniqueFields,
      dependencies: [],
      create
    })
  };

  /**
   * Handles removing an existing option
   * @param id {string} the id of the removed option
   */
  const handleRemoveOption = (id: string) => {
    const option = CONFIG.service.findById(id);
    if (!option) {
      return;
    }

    showConfirmModal({
      title: 'Delete confirmation',
      message: `Delete Action ${option?.name}?`,
      onConfirm: () => {
        removeOption(option, {
          service: CONFIG.service,
          fullEntityName: 'Action\\Verification pattern "{$name}"',
          dependencies: [],
          links: [],
        });
      },
    });
  };

  /**
   * Handles restore patterns
   */
  const handleRestore = () => {
    showConfirmModal({
      title: 'Load defaults',
      message: 'Are you sure to load defaults for action patterns?',
      onConfirm: () => {
        patternService.loadDefaults(PatternType.ACTION);
        console.log('Default action patterns loaded.');
      },
    });
  };

  /**
   * Renders the <select> component used as filter or the editor's option of framework
   */
  const renderFrameworkSelect = () => {
    let value = isEditing ? editorData.framework : optionsFilter.framework;
    return (
      <div className="row">
        <div className="col">
          <div className="form-group mb-2">
            <SelectComponent
              options={frameworkSelectOptions}
              className="form-control form-control-sm"
              value={value}
              onChange={isEditing ? handleChangeFramework : handleChangeFrameworkFilter}
            />
          </div>
        </div>
      </div>
    );
  }

  return isActive ? (
    <div
      id={SettingsFrameworkTabType.ACTIONS}
      className={`tab-pane fade ${isActive ? 'show active' : ''} ${isEditing ? 'crisp-show-editor' : ''}`}
    >
      <div className="container">
        <div className="row">
          <div className="col-6">

            {renderFrameworkSelect()}

            <div className="row">
              <div className="col">
                <div className="input-group">
                  <input
                    required
                    type="text"
                    className="form-control form-control-sm pattern-name"
                    placeholder="Pattern name"
                    value={isEditing ? editorData.name : optionName}
                    onChange={(ev) => {handleChangeName(ev)}}
                  />
                  <div className="input-group-append">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={handleCreateOption}
                    >
                      <svg className="bi bi-plus-circle" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z"/>
                        <path fillRule="evenodd" d="M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z"/>
                        <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <SettingsOptions
              options={filteredOptions}
              edit={handleEditOption}
              duplicate={handleDuplicateOption}
              remove={handleRemoveOption}
            />

          </div>
          <div className="col">
            <div className="settings-editor">
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <textarea
                      data-extra-field="description"
                      className="form-control form-control-sm pattern-template"
                      rows={3}
                      placeholder="Enter script"
                      value={editorData.script}
                      onChange={handleChangeScript}
                    ></textarea>
                    <small className="form-text text-muted">{CONFIG.scriptDescription}</small>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col d-flex justify-content-center">
                  <button
                    type="button"
                    className="btn btn-sm btn-primary btn-block option-btn-save"
                    onClick={() => {handleSaveOption(editorData)}}
                  >Save</button>
                </div>
                <div className="col d-flex justify-content-center">
                  <button
                    type="button"
                    className="btn btn-sm btn-secondary btn-block"
                    onClick={handleCancelEditing}
                  >Cancel</button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-3 settings-storage">
            <div className="row">
              <div className="col-12 d-flex justify-content-center mt-1">
                <button type="button"
                  className="btn btn-sm btn-primary btn-block option-btn-load-defaults"
                  data-for="action-pattern"
                  onClick={handleRestore}
                >Restore basic Action patterns</button>
              </div>
              <div className="col-12 d-flex justify-content-center mt-1">
                <button type="button"
                  className="btn btn-sm btn-primary btn-block option-btn-load-data"
                  data-for="action-pattern"
                  onClick={handleImport}
                >Import Action patterns</button>
              </div>
              <div className="col-12 d-flex justify-content-center mt-1">
                <button type="button"
                  className="btn btn-sm btn-primary btn-block option-btn-save-data"
                  data-for="action-pattern"
                  onClick={handleExport}
                >Export Action patterns</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}