let connections: Map<number, chrome.runtime.Port> = new Map();
let tabId: number;

chrome.tabs.onActivated.addListener((inf) => {
  tabId = inf?.tabId;
});


/*
 * agent <- content-script.js <- **background.js** <- dev tools
 */
chrome.runtime.onConnect.addListener((port) => {
  chrome.runtime.onMessage.addListener((request, sender) => {
    console.log('request from page: ' + request + sender);
    if (sender.tab) {
      const tabId = sender.tab.id;
      if (tabId && connections.has(tabId)) {
        connections.get(tabId)?.postMessage(request);
      } else {
        console.log('Tab not found in connection list.');
      }
    } else {
      console.log('sender.tab not defined.');
    }
    return true;
  });
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
  if (tabId in connections && changeInfo.status === 'complete') {
    // TODO: reload connection to page somehow...?
    connections.get(tabId)?.postMessage({
      name: 'reloaded'
    });
  }
});