import { ElementSelectors } from './elements/element-selectors-interface';

export interface RecalculatePathsRequest {
  type: 'recalculatePaths' | 'generateTree';
  payload?: any;
}

export type ContentScriptRequest = RecalculatePathsRequest;

declare global {
  interface Window {
    __CRISP_CTX: { element: HTMLElement };
  }
}

console.log('CRISP CONTENTSCRIPT: initialization');

let currentInspectedElement: ElementSelectors;

/*
 * agent <- **contentscript.ts** <- dev tools
 */
chrome.runtime.onMessage.addListener((request: ContentScriptRequest, sender, sendResponse) => {
  console.log('CRISP CONTENTSCRIPT: messaging ' + (sender.tab ?
    'from a content script:' + sender.tab.url :
    'from the extension'));
  console.log(request, sender, sendResponse);
  if (request.type === 'recalculatePaths') { // sends data of current selected DOM element
    setSelectedElement(window.__CRISP_CTX?.element),
    sendResponse(currentInspectedElement);
  }
  if (request.type === 'generateTree') { // gathers and sends DOM elements with specified attributes data
    const { attribute } = request.payload;
    const elements = document.querySelectorAll(`[${attribute}]`) as NodeListOf<HTMLElement>;
    const response: {selectors: ElementSelectors; name: string }[] = [];
    for (let i = 0; i < elements.length; i++) {
      const dataAttr = elements[i].getAttribute(attribute) as string;
      response.push({
        selectors: {
          elementCss: getElementAttributeSelector(attribute, dataAttr), // TODO: configure CSS logic to distinguish same attributes
          elementId: elements[i].id,
          elementXPath: getXPath(elements[i]),
        },
        name: dataAttr,
      });
    }
    sendResponse(response);
  }
});

export function setSelectedElement(currentElement: HTMLElement) {
  console.log('CRISP CONTENTSCRIPT', currentElement);
  currentInspectedElement = {
    elementCss: getCSSSelector(currentElement),
    elementId: currentElement?.id,
    elementXPath: getXPath(currentElement),
  };
}

function getElementAttributeSelector(attribute: string, attributeValue: string): string {
  if (attribute === 'id') {
    return `#${attributeValue}`;
  }
  return `[${attribute}='${attributeValue}']`;
}

function getParentPath(leaf: HTMLElement) {
  let path = [leaf];
  while (!path[path.length - 1].id && path[path.length - 1].parentElement) {
    path.push(path[path.length - 1].parentElement!);
  }
  path.reverse();
  return path;
}

function getXPath(leaf: HTMLElement) {
  function getElementIdx(elt: HTMLElement) {
    let count = 1;
    for (let sib = elt.previousSibling; sib ; sib = sib.previousSibling) {
      if (sib.nodeType === 1 && (sib as HTMLElement).tagName === elt.tagName)	count++;
    }
    return count;
  }
  const [root, ...path] = getParentPath(leaf);
  const firstItem: string = root.id ? `//*[@id="${root.id}"]` : '/html';
  return [firstItem, ...path.map(elem => {
    let idx = getElementIdx(elem);
    return `${elem.tagName.toLowerCase()}${idx > 1 ? `[${idx}]` : ''}`;
  })].join('/');
}

function getCSSSelector(leaf: HTMLElement) {
  const [root, ...path] = getParentPath(leaf);
  const rootPart = root.tagName === 'HTML' ? '' : `#${root.id}`;
  const pathsPart = path.map((pathElem, idx) => {
    if (pathElem.className && isClassNameUniqueAmongChildren(pathElem, idx)) {
      return `${pathElem.tagName.toLowerCase()}.${pathElem.className.split(' ').filter(cl => !!cl).join('.')}`;
    }

    const sameSiblings = Array.prototype.filter.call((path[idx - 1] || root).children, (child: HTMLElement) => {
      return child.tagName === pathElem.tagName;
    });
    const childIdx: number = Array.prototype.indexOf.call(sameSiblings, pathElem);
    if (childIdx === 0) {
      return pathElem.tagName.toLowerCase();
    }
    return `${pathElem.tagName.toLowerCase()}:nth-child(${childIdx + 1})`;
  });

  // Old logic without classes - leave for performance in case it's crucial
  // const rootPart = `#${root.id}`;
  // const pathsPart = path.map((pathElem, idx) => {
  //   const childIdx: number = Array.prototype.indexOf.call((path[idx - 1] || root).children, pathElem);
  //   return `${pathElem.tagName.toLowerCase()}:nth-child(${childIdx + 1})`;
  // });

  const parts = [...pathsPart];
  if (rootPart) parts.unshift(rootPart);

  return parts.join(' > ');

  function isClassNameUniqueAmongChildren(pathElem: HTMLElement, idx: number): boolean {
    const allSiblings = Array.prototype.filter.call((path[idx - 1] || root).children, (child: HTMLElement) => {
      return child !== pathElem;
    });
    const siblingClassNames = Array.prototype.map.call(allSiblings, (child: HTMLElement) => {
      return child.className;
    });
    return !siblingClassNames.includes(pathElem.className);
  }
}
