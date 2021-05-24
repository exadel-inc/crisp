import * as React from 'react';
import { useEffect, useState } from 'react';
import { Page } from '../../pages/page';
import { Pattern } from '../../patterns/pattern';
import { PatternType } from '../../patterns/pattern-interface';
import { DEFAULT_PO_PATTERN } from '../../patterns/standard-patterns';
import { elementsService, pagesService, patternService, projectsService } from '../../shared/services';
import { default as chromep } from 'chrome-promise';
import { ElementSelectors } from '../../elements/element-selectors-interface';
import { CrispElement } from '../../elements/element';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { NavigateAction } from '../../redux/reducers/navigation/navigation.actions';
import { Select } from '../shared/select/select.component';
import { NavigationTabType } from '../header/navigation-tabs';
import { showToast } from '../shared/toasts-component';
import { useConfirmModal } from '../shared/confirm-modal/confirm-modal';
import { AddType } from '../../shared/common-service';

/**
 * Batch generate tab
 */
export function BatchGenerateTab () {

  /**
   * Pages of current project from storage
  */
  const savedPages: Page[] = useSelector(() => pagesService.getMany(projectsService.currentProject?.id));

  /**
   * Page object patterns of current framework from storage
  */
  const savedPageObjectPatterns: Pattern[] = patternService.getMany(PatternType.PAGE_OBJECT, projectsService.currentProject?.framework);

  /**
   * Component state: page object pattern
  */
  const [pattern, setPattern] = useState(DEFAULT_PO_PATTERN);

  /**
   * Component state: page
  */
  const [page, setPage] = useState(savedPages[0]?.id);

  /**
   * Update selected page on component init
  */
  useEffect(() => setPage(savedPages[0]?.id), []);

  /**
   * Component state: attribute used for element selection
  */
  const [attribute, setAttribute] = useState('data-test-id');

  /**
   * Component state: display fields validation
   */
  const [validated, setValidated] = useState(false);

  /**
   * create Confirm modal
  */
  const showConfirmModal = useConfirmModal();

  /**
   * Validates form and trigger to display validation results for each field 
   * Retruns form validity
  */
  const validateForm = (): boolean => {
    setValidated(true);
    setTimeout(() => setValidated(false), 1500);
    return !!(attribute && page);
  }

  const dispatch = useDispatch();

  /**
   * Navigates to main page
  */
  const navigateToMainPage = (): void => {
    dispatch({...new NavigateAction(NavigationTabType.MAIN)});
  };

  /**
   * Sends request to collect elements data based on specific attribute
  */
  const batchGenerate = async (): Promise<void> => {
    const [{ id: tabId }, ] = await chromep.tabs.query({ active: true, currentWindow: true });
    if (tabId) {
      const isFormValid: boolean = validateForm();
      if (isFormValid) {
        const response: {selectors: ElementSelectors; name: string }[] = await new Promise(
          done => chrome.tabs.sendMessage(tabId, {
            type: 'generateTree',
            payload: { attribute }
          }, done)
        );
        addElements(response);
      } else {
        showToast('Please fill all mandatory fields', 'danger');
      }
    }
  };

  /**
   * Adds new element
   * @param elementsData {response: {selectors: ElementSelectors; name: string } response with element selectors and name
  */
  const addElements = (elementsData: {selectors: ElementSelectors; name: string }[]): void => {
    const newElements: CrispElement[] = elementsData.map(elData => new CrispElement(
      elData.name,
      elData.name, // TODO: get description
      page,
      elData.selectors,
      pattern ? {
        customVars: {},
        id: pattern
      } : null,
    ));

    showConfirmModal({
      title: 'Batch elements add confirmation',
      message: `${newElements.length} elements were found for provided attribute: "${attribute}". Are you sure you want to add them?`,
      onConfirm: () => {
        try {
          elementsService.addMany(newElements, AddType.SKIP_EXISTING)
          showToast('Elements were created', 'success');
          navigateToMainPage();
        } catch (error) {
          const message = (error as Error).message;
          showToast(message, 'danger');
        }
      },
    });
  }


  /**
   * Is current tab active
  */
  const isActive = useSelector((state: RootState) => state.navigation.tab) === NavigationTabType.BATCH;

  return isActive ? (
    <div className={`tab-pane fade show ${isActive ? 'active' : ''} ${validated ? 'was-validated' : ''}`} id="batch">

      <div className="container">
        <div className="row d-flex align-items-end">
          <div className="col-6">
            <div className="form-group mb-2">
              <Select
                value={page}
                options={savedPages}
                onChange={(option) => setPage(option!.id)}
                settings={{
                  required: true,
                  label: {
                    label: 'Page*',
                    className: 'mb-1',
                  },
                  firstOption: {
                    label: 'Select page',
                  },
                  id: 'batch-pages',
                  className: 'form-control-sm',
                }}
              />
              <div className="invalid-feedback">
                Please select a page for the element
              </div>
            </div>

            <div className="form-group mb-2">
              <Select
                value={pattern || ''}
                options={savedPageObjectPatterns}
                onChange={(option) => setPattern(option!.id)}
                settings={{
                  required: true,
                  label: {
                    label: 'Page Object',
                    className: 'mb-1',
                  },
                  firstOption: {
                    label: 'None',
                    enabled: true,
                  },
                  id: 'batch-page-object',
                  className: 'form-control-sm',
                }}
              />
            </div>

            <div className="form-group mb-2">
              <label className="mb-1">Attribute*</label>
              <input required id="batch-attribute"
                type="text"
                className="form-control form-control-sm"
                placeholder="Enter attribute"
                value={attribute}
                onChange={(event) => setAttribute(event.target.value)}
              />
              <div className="invalid-feedback">
                Please enter attribute
              </div>
            </div>
          </div>
          <div className="col-6">
            <button id="btn-generate-batch-generate"
              type="button"
              className="btn btn-sm btn-primary btn-block mb-2"
              onClick={batchGenerate}
            >Extract & Save</button>
          </div>
        </div>
      </div>

    </div>
  ) : null;
}