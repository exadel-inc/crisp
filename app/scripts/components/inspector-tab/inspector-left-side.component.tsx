import * as React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CrispElement } from '../../elements/element';
import { ElementSelectors } from '../../elements/element-selectors-interface';
import { elementsService, pagesService, projectsService } from '../../shared/services';
import { Select, SelectOption } from '../shared/select/select.component';
import { dismissAllToasts, showToast } from '../shared/toasts-component';

type CrispElementEditableProps = Pick<CrispElement, 'page' | 'name' | 'description' | 'parentElement' | 'parentElement'>;

type RuntimeRequest = {
  data?: ElementSelectors;
  target?: string;
};

/**
 * Inspector left side: page, name, description and selectors 
 * @param element {CrispElement} current edited element
 * @param onChange {Function} function called on current element change
 */
export function InspectorLeftSide ({ element, onChange }: {
  element: CrispElement;
  onChange: (element: CrispElement) => void;
}) {

  /**
   * Pages of current project from storage
   */
  const pages: SelectOption[] = useSelector(() => pagesService.getMany(projectsService.currentProject?.id));

  /**
   * Possible variants for element's parent element
   */
  const parentElements: SelectOption[] = useSelector(() => [{id: '', name: 'None'}].concat(elementsService.getMany(element.page)));

  /**
   * Function called on element property change
   * @param propertyName {CrispElementEditableProps} element property name
   * @param propertyValue {string} element property value
  */
  const handleElementPropertyChange = (propertyName: keyof CrispElementEditableProps, propertyValue: string): void => {
    element[propertyName] = propertyValue;
    onChange(element);
  };

  /**
   * Function called on element property change
   * @param propertyName {ElementSelectors} element.selectors property name
   * @param propertyValue {string} element.selectors property value
  */
  const handleElementSelectorChange = (propertyName: keyof ElementSelectors, propertyValue: string): void => {
    element.selectors[propertyName] = propertyValue;
    onChange(element);
  };

  /**
   * Error count
  */
  let errorCount = 0;

  /**
   * Listens to the contentscript events and change element with new received selectors
  */
  const inspectedElementListener = (
    request: RuntimeRequest,
    _sender: chrome.runtime.MessageSender,
    sendResponse: Function
  ): void => {
    if (!request.data) {
      errorCount ++;
    }
    if (errorCount > 5) {
      showToast(
        `CRISP can't access page elements. Please refresh the page`,
        'danger',
      );
      return;
    }
    if (request.target === 'passCurrentInspectedElement' && request.data) {
      errorCount = 0;
      dismissAllToasts();
      sendResponse('CRISP PANEL: received updated element data');
      element.selectors = request.data;
      onChange(element);
    }
  };

  /**
   * Subscribe and unsubscribe for contentscript events on component mount and unmount
  */
  useEffect(() => {
    chrome.runtime.onMessage.addListener(inspectedElementListener);
    return () => {
      chrome.runtime.onMessage.removeListener(inspectedElementListener);
    }
  }, [element])

  return (
    <div className="col-8">
      <div id="inspector-validation" className="row">
        <div className="col-5">
          <div className="form-group mb-2">
            <Select
              value={element.page}
              options={pages}
              onChange={(option) => handleElementPropertyChange('page', option!.id)}
              settings={{
                required: true,
                label: {
                  label: 'Page*',
                  className: 'mb-1',
                },
                firstOption: {
                  label: 'Select page',
                },
                id: 'inspector-pages',
                className: 'form-control-sm',
              }}
            />
            <div className="invalid-feedback">
              Please select a page for the element
            </div>
          </div>
        </div>
        <div className="col">
          <div className="form-group mb-2">
            <label className="mb-1">Element name*</label>
            <input required id="inspector-element-name"
              type="text"
              className="form-control form-control-sm"
              placeholder="Enter element name"
              value={element.name}
              onChange={(event) => handleElementPropertyChange('name', event.target.value)}
            />
            <div className="invalid-feedback">
              Please enter an element name
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="form-group mb-2">
            <label className="mb-1">Element description</label>
            <input id="inspector-element-description"
              type="text"
              className="form-control form-control-sm"
              placeholder="Enter element description"
              value={element.description}
              onChange={(event) => handleElementPropertyChange('description', event.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="form-group mb-2">
            <label className="mb-1">ID</label>
            <input id="element-id"
              type="text"
              className="form-control form-control-sm"
              placeholder="Enter element ID"
              value={element.selectors.elementId || ''}
              onChange={(event) => handleElementSelectorChange('elementId', event.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="form-group mb-2">
            <label className="mb-1">CSS</label>
            <input id="element-css"
              type="text"
              className="form-control form-control-sm"
              placeholder="Enter CSS selector"
              value={element.selectors.elementCss || ''}
              onChange={(event) => handleElementSelectorChange('elementCss', event.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="form-group mb-2">
            <label className="mb-1">xPath</label>
            <input id="element-xpath"
              type="text"
              className="form-control form-control-sm"
              placeholder="Enter xPath"
              value={element.selectors.elementXPath || ''}
              onChange={(event) => handleElementSelectorChange('elementXPath', event.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="form-group mb-2">
            <Select
              value={element.parentElement}
              options={parentElements}
              onChange={(option) => handleElementPropertyChange('parentElement', option!.id)}
              settings={{
                label: {
                  label: 'Parent element',
                  className: 'mb-1',
                },
                id: 'element-parent',
                className: 'form-control-sm',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
