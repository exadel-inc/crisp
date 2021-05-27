import { initialDate } from '../shared/initial-date';
import { CrispElement } from './element';

/**
 * Built-in demo elements
*/
export const STANDARD_ELEMENTS = [
  new CrispElement(
    'Placeholder (for steps without elements)',
    '',
    '5fa19dd690f43c0002200001',
    {},
    null,
    [
      {
        id: '5fa19dd690f43c0001f00061',
        customVars: {
          url: 'https://en.wikipedia.org',
        },
      }
    ],
    '',
    '5fa19dd690f43c0002300001',
    initialDate,
  ),
  new CrispElement(
    'Search Input',
    '',
    '5fa19dd690f43c0002200001',
    {
      elementCss: '#searchInput',
      elementId: 'searchInput',
      elementXPath: '//*[@id=\"searchInput\"]',
    },
    null,
    [
      {
        id: '5fa19dd690f43c0001f00190',
        customVars: {
          text: 'Lorem ipsum',
        },
      }
    ],
    '',
    '5fa19dd690f43c0002300002',
    initialDate,
  ),
  new CrispElement(
    'Search Button',
    '',
    '5fa19dd690f43c0002200001',
    {
      elementCss: '.pure-button',
      elementId: '',
      elementXPath: '//*[@id=\"search-form\"]/fieldset/button',
    },
    null,
    [
      {
        id: '5fa19dd690f43c0001f00192',
        customVars: {},
      }
    ],
    '',
    '5fa19dd690f43c0002300003',
    initialDate,
  ),
  new CrispElement(
    'First Heading',
    '',
    '5fa19dd690f43c0002200001',
    {
      elementCss: '#firstHeading',
      elementId: 'firstHeading',
      elementXPath: '//*[@id=\"firstHeading\"]',
    },
    null,
    [
      {
        id: '5fa19dd690f43c0001f00147',
        customVars: {
          text: 'Lorem ipsum',
        },
      }
    ],
    '',
    '5fa19dd690f43c0002300004',
    initialDate,
  ),
];
