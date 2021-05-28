/* eslint-disable no-eval */
import { default as chromep } from 'chrome-promise';


chrome.devtools.panels.elements.createSidebarPane('CRISP', (sidebar) => {
  sidebar.setPage('pages/crisp.html');
  sidebar.setHeight('8ex');

  chrome.devtools.panels.elements.onSelectionChanged.addListener(handleSelectedElement);

  async function handleSelectedElement() {
    // https://github.com/facebook/react/blob/4c7036e807fa18a3e21a5182983c7c0f05c5936e/packages/react-devtools-extensions/src/main.js#L256
    await evaluate('(window.__CRISP_CTX = { element: $0 }, true)');
    const [{ id: tabId }, ] = await chromep.tabs.query({ active: true, currentWindow: true });
    if (tabId) {
      const response = await new Promise(done => chrome.tabs.sendMessage(tabId, { type: 'recalculatePaths' }, done));
      chrome.runtime.sendMessage({ target: 'passCurrentInspectedElement', data: response }, (response) => {
        console.log(response);
        if (!window.chrome.runtime.lastError) {
          console.log(response);
        } else {
          console.error('CRISP can`t access page elements. Please refresh the page');
        }
      });
    }
  }
});

function evaluate(input: string): Promise<string> {
  return new Promise(done => chrome.devtools.inspectedWindow.eval(input, { useContentScriptContext: true }, done));
}