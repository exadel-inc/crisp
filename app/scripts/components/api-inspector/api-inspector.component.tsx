import * as React from 'react';
import { SetStateAction, useEffect, useState } from 'react';
import { CrispElement } from '../../elements/element';
import { elementsService, pagesService, patternService, projectsService } from '../../shared/services';

type RuntimeRequest = {
  data?: any;
  target?: string;
};

/**
 * Inspector left side: page, name, description and selectors 
 * @param element {CrispElement} current edited element
 * @param onChange {Function} function called on current element change
 */
export function ApiInspector () {

  const [requests, setRequests]: [any[], React.Dispatch<SetStateAction<any[]>>] = useState([]);

  const urlAction = patternService.find('Called with URL');
  const project = projectsService.currentProject;
  const page = pagesService.getMany(project!.id)[0]

  const addElement = (url: string) => {
    const patternData = {
      id: urlAction!.id,
      customVars: {
        url,
      },
    };
    const element = new CrispElement('API call', '', page!.id, {}, null, [patternData])
    elementsService.add(element);
  }

  const inspectedApiListener = (
    request: RuntimeRequest,
    _sender: chrome.runtime.MessageSender,
    sendResponse: Function
  ): void => {
    if (request.target === 'passNewRequest' && request.data) {
      setRequests([...requests, request.data])
    }
  };

  chrome.runtime.onMessage.addListener(inspectedApiListener);

  return (
        <div className="container">
          Api Inspector
          <table className="table table-bordered table-sm">
            <thead>
              <tr>
                <th scope="col">Method</th>
                <th style={{
                      width: '70%',
                      wordWrap: 'break-word',
                      wordBreak: 'break-all',
                    }}
                    scope="col">URL</th>
                <th scope="col">status</th>
                <th scope="col">action (Called with URL)</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request, i) => <tr key={i}>
                <td style={{
                      width: '10%',
                    }}>{request.request.method}
                </td>
                <td style={{
                      width: '70%',
                      wordWrap: 'break-word',
                      wordBreak: 'break-all',
                    }}> {request.request.url} </td>
                <td style={{
                      width: '10%',
                    }}>{request.response.status}</td>
                <td style={{
                      width: '10%',
                    }}><button onClick={() => addElement(request.request.url)}>+</button></td>
              </tr>)}
            </tbody>
          </table>
        </div>
  );
};
