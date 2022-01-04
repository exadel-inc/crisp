import { FrameworkEntityWithId } from 'src/modules/framework/framework.entity';
import { PatternType, STANDARD_VAR_NAMES } from '../../common/enums';
import { FrameworkMongoService, PatternMongoService } from '../mongo-services';

const patternMongoService: PatternMongoService = new PatternMongoService();
const frameworkMongoService: FrameworkMongoService = new FrameworkMongoService();

const patterns = [
  {
    type: PatternType.ACTION,
    name: 'given closed all but the first tab',
    script: 'Given I have closed all but the first tab',
  },
  {
    type: PatternType.ACTION,
    name: 'given closed all but the first window',
    script: 'Given I have closed all but the first window',
  },
  {
    type: PatternType.ACTION,
    name: 'given screen size is ${x} by ${y} pixels',
    script: 'Given I have a screen that is ${x} by ${y} pixels',
  },
  {
    type: PatternType.ACTION,
    name: 'given there is no element on the page',
    script: 'Given there is no element "${' + STANDARD_VAR_NAMES.ELEMENT_CSS + '}" on the page',
  },
  {
    type: PatternType.ACTION,
    name: 'given there is an element on the page',
    script: 'Given there is an element "${' + STANDARD_VAR_NAMES.ELEMENT_CSS + '}" on the page',
  },
  {
    type: PatternType.ACTION,
    name: 'given prompt is not opened',
    script: 'Given a prompt is not opened',
  },
  {
    type: PatternType.ACTION,
    name: 'given prompt is opened',
    script: 'Given a prompt is opened',
  },
  {
    type: PatternType.ACTION,
    name: 'given confirmbox is not opened',
    script: 'Given a confirmbox is not opened',
  },
  {
    type: PatternType.ACTION,
    name: 'given confirmbox is opened',
    script: 'Given a confirmbox is opened',
  },
  {
    type: PatternType.ACTION,
    name: 'given alertbox is not opened',
    script: 'Given a alertbox is not opened',
  },
  {
    type: PatternType.ACTION,
    name: 'given alertbox is opened',
    script: 'Given a alertbox is opened',
  },
  {
    type: PatternType.ACTION,
    name: 'given element is not positioned at "n" px on the y axis',
    script:
      'Given the element "${' +
      STANDARD_VAR_NAMES.ELEMENT_CSS +
      '}" is not positioned at ${px}px on the y axis',
  },
  {
    type: PatternType.ACTION,
    name: 'given element is positioned at "n" px on the y axis',
    script:
      'Given the element "${' +
      STANDARD_VAR_NAMES.ELEMENT_CSS +
      '}" is positioned at ${px}px on the y axis',
  },
  {
    type: PatternType.ACTION,
    name: 'given element is not positioned at "n" px on the x axis',
    script:
      'Given the element "${' +
      STANDARD_VAR_NAMES.ELEMENT_CSS +
      '}" is not positioned at ${px}px on the x axis',
  },
  {
    type: PatternType.ACTION,
    name: 'given element is positioned at "n" px on the x axis',
    script:
      'Given the element "${' +
      STANDARD_VAR_NAMES.ELEMENT_CSS +
      '}" is positioned at ${px}px on the x axis',
  },
  {
    type: PatternType.ACTION,
    name: 'given element dimension is not "n" px tall',
    script: 'Given the element "${' + STANDARD_VAR_NAMES.ELEMENT_CSS + '}" is not ${px}px tall',
  },
  {
    type: PatternType.ACTION,
    name: 'given element dimension is "n" px tall',
    script: 'Given the element "${' + STANDARD_VAR_NAMES.ELEMENT_CSS + '}" is ${px}px tall',
  },
  {
    type: PatternType.ACTION,
    name: 'given element dimension is not "n" px broad',
    script: 'Given the element "${' + STANDARD_VAR_NAMES.ELEMENT_CSS + '}" is not ${px}px broad',
  },
  {
    type: PatternType.ACTION,
    name: 'given element dimension is "n" px broad',
    script: 'Given the element "${' + STANDARD_VAR_NAMES.ELEMENT_CSS + '}" is ${px}px broad',
  },
  {
    type: PatternType.ACTION,
    name: 'given cookie not exists',
    script: 'Given the cookie "${cookieName}" does not exist',
  },
  {
    type: PatternType.ACTION,
    name: 'given cookie exists',
    script: 'Given the cookie "${cookieName}" does exist',
  },
  {
    type: PatternType.ACTION,
    name: 'given cookie not contains',
    script: 'Given the cookie "${cookieName}" contains not the value "${expectedValue}"',
  },
  {
    type: PatternType.ACTION,
    name: 'given cookie contains',
    script: 'Given the cookie "${cookieName}" contains the value "${expectedValue}"',
  },
  {
    type: PatternType.ACTION,
    name: 'given css attribute is not equal',
    script:
      'Given the css attribute "${attrName}" from element "${' +
      STANDARD_VAR_NAMES.ELEMENT_CSS +
      '}" is not "${expectedValue}"',
  },
  {
    type: PatternType.ACTION,
    name: 'given css attribute is equal',
    script:
      'Given the css attribute "${attrName}" from element "${' +
      STANDARD_VAR_NAMES.ELEMENT_CSS +
      '}" is "${expectedValue}"',
  },
  {
    type: PatternType.ACTION,
    name: 'given attribute is not equal',
    script:
      'Given the attribute "${attrName}" from element "${' +
      STANDARD_VAR_NAMES.ELEMENT_CSS +
      '}" is not "${expectedValue}"',
  },
  {
    type: PatternType.ACTION,
    name: 'given attribute is equal',
    script:
      'Given the attribute "${attrName}" from element "${' +
      STANDARD_VAR_NAMES.ELEMENT_CSS +
      '}" is "${expectedValue}"',
  },
  {
    type: PatternType.ACTION,
    name: 'given url is not equal',
    script: 'Given the page url is not "${url}"',
  },
  {
    type: PatternType.ACTION,
    name: 'given url is equal',
    script: 'Given the page url is "${url}"',
  },
  {
    type: PatternType.ACTION,
    name: 'given element is not empty',
    script: 'Given the element "${' + STANDARD_VAR_NAMES.ELEMENT_CSS + '}" is not empty',
  },
  {
    type: PatternType.ACTION,
    name: 'given button is not empty',
    script: 'Given the button "${' + STANDARD_VAR_NAMES.ELEMENT_CSS + '}" is not empty',
  },
  {
    type: PatternType.ACTION,
    name: 'given element is empty',
    script: 'Given the element "${' + STANDARD_VAR_NAMES.ELEMENT_CSS + '}" is empty',
  },
  {
    type: PatternType.ACTION,
    name: 'given button is empty',
    script: 'Given the button "${' + STANDARD_VAR_NAMES.ELEMENT_CSS + '}" is empty',
  },
  {
    type: PatternType.ACTION,
    name: 'given element not contains any text',
    script: 'Given the element "${' + STANDARD_VAR_NAMES.ELEMENT_CSS + '}" not contains any text',
  },
  {
    type: PatternType.ACTION,
    name: 'given button not contains any text',
    script: 'Given the button "${' + STANDARD_VAR_NAMES.ELEMENT_CSS + '}" not contains any text',
  },
  {
    type: PatternType.ACTION,
    name: 'given element contains any text',
    script: 'Given the element "${' + STANDARD_VAR_NAMES.ELEMENT_CSS + '}" contains any text',
  },
  {
    type: PatternType.ACTION,
    name: 'given button contains any text',
    script: 'Given the button "${' + STANDARD_VAR_NAMES.ELEMENT_CSS + '}" contains any text',
  },
  {
    type: PatternType.ACTION,
    name: 'given element not contains the text',
    script:
      'Given the element "${' +
      STANDARD_VAR_NAMES.ELEMENT_CSS +
      '}" not contains the text "{text}"',
  },
  {
    type: PatternType.ACTION,
    name: 'given button not contains the text',
    script:
      'Given the button "${' + STANDARD_VAR_NAMES.ELEMENT_CSS + '}" not contains the text "{text}"',
  },
  {
    type: PatternType.ACTION,
    name: 'given container not contains the text',
    script:
      'Given the container "${' +
      STANDARD_VAR_NAMES.ELEMENT_CSS +
      '}" not contains the text "{text}"',
  },
  {
    type: PatternType.ACTION,
    name: 'given element contains the text',
    script:
      'Given the element "${' + STANDARD_VAR_NAMES.ELEMENT_CSS + '}" contains the text "{text}"',
  },
  {
    type: PatternType.ACTION,
    name: 'given button contains the text',
    script:
      'Given the button "${' + STANDARD_VAR_NAMES.ELEMENT_CSS + '}" contains the text "{text}"',
  },
  {
    type: PatternType.ACTION,
    name: 'given container contains the text',
    script:
      'Given the container "${' + STANDARD_VAR_NAMES.ELEMENT_CSS + '}" contains the text "{text}"',
  },
  {
    type: PatternType.ACTION,
    name: 'given element not matches the text',
    script:
      'Given the element "${' +
      STANDARD_VAR_NAMES.ELEMENT_CSS +
      '}" not matches the text "${text}"',
  },
  {
    type: PatternType.ACTION,
    name: 'given element matches the text',
    script:
      'Given the element "${' + STANDARD_VAR_NAMES.ELEMENT_CSS + '}" matches the text "${text}"',
  },
  {
    type: PatternType.ACTION,
    name: 'given button not matches the text',
    script:
      'Given the button "${' + STANDARD_VAR_NAMES.ELEMENT_CSS + '}" not matches the text "${text}"',
  },
  {
    type: PatternType.ACTION,
    name: 'given button matches the text',
    script:
      'Given the button "${' + STANDARD_VAR_NAMES.ELEMENT_CSS + '}" matches the text "${text}"',
  },
  {
    type: PatternType.ACTION,
    name: 'given element contains not the same text as element',
    script:
      'Given the element "${' +
      STANDARD_VAR_NAMES.ELEMENT_CSS +
      '}" contains not the same text as element "${element2Css}"',
  },
  {
    type: PatternType.ACTION,
    name: 'given element contains the same text as element',
    script:
      'Given the element "${' +
      STANDARD_VAR_NAMES.ELEMENT_CSS +
      '}" contains the same text as element "${element2Css}"',
  },
  {
    type: PatternType.ACTION,
    name: 'given title is not equal',
    script: 'Given the title is not "${text}"',
  },
  {
    type: PatternType.ACTION,
    name: 'given title is equal',
    script: 'Given the title is "${text}"',
  },
  {
    type: PatternType.ACTION,
    name: 'given checkbox is not checked',
    script: 'Given the checkbox "${' + STANDARD_VAR_NAMES.ELEMENT_CSS + '}" is not checked',
  },
  {
    type: PatternType.ACTION,
    name: 'given checkbox is checked',
    script: 'Given the checkbox "${' + STANDARD_VAR_NAMES.ELEMENT_CSS + '}" is checked',
  },
  {
    type: PatternType.ACTION,
    name: 'given element is not selected',
    script: 'Given the element "${' + STANDARD_VAR_NAMES.ELEMENT_CSS + '}" is not selected',
  },
  {
    type: PatternType.ACTION,
    name: 'given element is selected',
    script: 'Given the element "${' + STANDARD_VAR_NAMES.ELEMENT_CSS + '}" is selected',
  },
  {
    type: PatternType.ACTION,
    name: 'given element is not enabled',
    script: 'Given the element "${' + STANDARD_VAR_NAMES.ELEMENT_CSS + '}" is not enabled',
  },
  {
    type: PatternType.ACTION,
    name: 'given element is enabled',
    script: 'Given the element "${' + STANDARD_VAR_NAMES.ELEMENT_CSS + '}" is enabled',
  },
  {
    type: PatternType.ACTION,
    name: 'given element is not displayed',
    script: 'Given the element "${' + STANDARD_VAR_NAMES.ELEMENT_CSS + '}" is not displayed',
  },
  {
    type: PatternType.ACTION,
    name: 'given element is displayed',
    script: 'Given the element "${' + STANDARD_VAR_NAMES.ELEMENT_CSS + '}" is displayed',
  },
  {
    type: PatternType.ACTION,
    name: 'given open site',
    script: 'Given I open the site "${url}"',
  },
  {
    type: PatternType.ACTION,
    name: 'given open url',
    script: 'Given I open the url "${url}"',
  },
  {
    type: PatternType.ACTION,
    name: 'expect prompt not contains the text',
    script: 'Then I expect that a prompt not contains the text "${text}"',
  },
  {
    type: PatternType.ACTION,
    name: 'expect prompt contains the text',
    script: 'Then I expect that a prompt contains the text "${text}"',
  },
  {
    type: PatternType.ACTION,
    name: 'expect confirmbox not contains the text',
    script: 'Then I expect that a confirmbox not contains the text "${text}"',
  },
  {
    type: PatternType.ACTION,
    name: 'expect confirmbox contains the text',
    script: 'Then I expect that a confirmbox contains the text "${text}"',
  },
  {
    type: PatternType.ACTION,
    name: 'expect alertbox not contains the text',
    script: 'Then I expect that a alertbox not contains the text "${text}"',
  },
  {
    type: PatternType.ACTION,
    name: 'expect alertbox contains the text',
    script: 'Then I expect that a alertbox contains the text "${text}"',
  },
  {
    type: PatternType.ACTION,
    name: 'expect prompt is not opened',
    script: 'Then I expect that a prompt is not opened',
  },
  {
    type: PatternType.ACTION,
    name: 'expect prompt is opened',
    script: 'Then I expect that a prompt is opened',
  },
  {
    type: PatternType.ACTION,
    name: 'expect confirmbox is not opened',
    script: 'Then I expect that a confirmbox is not opened',
  },
  {
    type: PatternType.ACTION,
    name: 'expect confirmbox is opened',
    script: 'Then I expect that a confirmbox is opened',
  },
  {
    type: PatternType.ACTION,
    name: 'expect alertbox is not opened',
    script: 'Then I expect that a alertbox is not opened',
  },
  {
    type: PatternType.ACTION,
    name: 'expect alertbox is opened',
    script: 'Then I expect that a alertbox is opened',
  },
  {
    type: PatternType.ACTION,
    name: 'wait on element to be checked',
    script: 'Then I wait on element to be checked',
  },
  {
    type: PatternType.ACTION,
    name: 'wait on element to be enabled',
    script: 'Then I wait on element to be enabled',
  },
  {
    type: PatternType.ACTION,
    name: 'wait on element to be selected',
    script: 'Then I wait on element to be selected',
  },
  {
    type: PatternType.ACTION,
    name: 'wait on element to be displayed',
    script: 'Then I wait on element to be displayed',
  },
  {
    type: PatternType.ACTION,
    name: 'wait on element to contain a text',
    script: 'Then I wait on element to contain a text "${text}"',
  },
  {
    type: PatternType.ACTION,
    name: 'wait on element to contain a value',
    script: 'Then I wait on element to contain a value "${value}"',
  },
  {
    type: PatternType.ACTION,
    name: 'wait on element to exist',
    script: 'Then I wait on element to exist',
  },
  {
    type: PatternType.ACTION,
    name: 'wait on element for "n" ms to be checked',
    script:
      'Then I wait on element "${' +
      STANDARD_VAR_NAMES.ELEMENT_CSS +
      '}" for ${ms}ms to be checked',
  },
  {
    type: PatternType.ACTION,
    name: 'wait on element for "n" ms to be enabled',
    script:
      'Then I wait on element "${' +
      STANDARD_VAR_NAMES.ELEMENT_CSS +
      '}" for ${ms}ms to be enabled',
  },
  {
    type: PatternType.ACTION,
    name: 'wait on element for "n" ms to be selected',
    script:
      'Then I wait on element "${' +
      STANDARD_VAR_NAMES.ELEMENT_CSS +
      '}" for ${ms}ms to be selected',
  },
  {
    type: PatternType.ACTION,
    name: 'wait on element for "n" ms to be displayed',
    script:
      'Then I wait on element "${' +
      STANDARD_VAR_NAMES.ELEMENT_CSS +
      '}" for ${ms}ms to be displayed',
  },
  {
    type: PatternType.ACTION,
    name: 'wait on element for "n" ms to contain a text',
    script:
      'Then I wait on element "${' +
      STANDARD_VAR_NAMES.ELEMENT_CSS +
      '}" for ${ms}ms to contain a text "${text}"',
  },
  {
    type: PatternType.ACTION,
    name: 'wait on element for "n" ms to contain a value',
    script:
      'Then I wait on element "${' +
      STANDARD_VAR_NAMES.ELEMENT_CSS +
      '}" for ${ms}ms to contain a value "${value}"',
  },
  {
    type: PatternType.ACTION,
    name: 'wait on element for "n" ms to exist',
    script:
      'Then I wait on element "${' + STANDARD_VAR_NAMES.ELEMENT_CSS + '}" for ${ms}ms to exist',
  },
  {
    type: PatternType.ACTION,
    name: 'wait on element for "n" ms',
    script: 'Then I wait on element "${' + STANDARD_VAR_NAMES.ELEMENT_CSS + '}" for ${ms}ms',
  },
  {
    type: PatternType.ACTION,
    name: 'wait on element',
    script: 'Then I wait on element "${' + STANDARD_VAR_NAMES.ELEMENT_CSS + '}"',
  },
  {
    type: PatternType.ACTION,
    name: 'expect element is not focused',
    script: 'Then I expect that element "${' + STANDARD_VAR_NAMES.ELEMENT_CSS + '}" is not focused',
  },
  {
    type: PatternType.ACTION,
    name: 'expect element is focused',
    script: 'Then I expect that element "${' + STANDARD_VAR_NAMES.ELEMENT_CSS + '}" is focused',
  },
  {
    type: PatternType.ACTION,
    name: 'expect url is opened in a new window',
    script: 'Then I expect the url "${url}" is opened in a new window',
  },
  {
    type: PatternType.ACTION,
    name: 'expect url is opened in a new tab',
    script: 'Then I expect the url "${url}" is opened in a new tab',
  },
  {
    type: PatternType.ACTION,
    name: 'expect new tab has not been opened',
    script: 'Then I expect a new tab has not been opened',
  },
  {
    type: PatternType.ACTION,
    name: 'expect new tab has been opened',
    script: 'Then I expect a new tab has been opened',
  },
  {
    type: PatternType.ACTION,
    name: 'expect new window has not been opened',
    script: 'Then I expect a new window has not been opened',
  },
  {
    type: PatternType.ACTION,
    name: 'expect new window has been opened',
    script: 'Then I expect a new window has been opened',
  },
  {
    type: PatternType.ACTION,
    name: 'expect element does not have the class',
    script:
      'Then I expect that element "${' +
      STANDARD_VAR_NAMES.ELEMENT_CSS +
      '}" does not have the class "${expectedClassName}"',
  },
  {
    type: PatternType.ACTION,
    name: 'expect element has the class',
    script:
      'Then I expect that element "${' +
      STANDARD_VAR_NAMES.ELEMENT_CSS +
      '}" has the class "${expectedClassName}"',
  },
  {
    type: PatternType.ACTION,
    name: 'expect element is not positioned at "n" px on the y axis',
    script:
      'Then I expect that element "${' +
      STANDARD_VAR_NAMES.ELEMENT_CSS +
      '}" is not positioned at ${px}px on the y axis',
  },
  {
    type: PatternType.ACTION,
    name: 'expect element is positioned at "n" px on the y axis',
    script:
      'Then I expect that element "${' +
      STANDARD_VAR_NAMES.ELEMENT_CSS +
      '}" is positioned at ${px}px on the y axis',
  },
  {
    type: PatternType.ACTION,
    name: 'expect element is not positioned at "n" px on the x axis',
    script:
      'Then I expect that element "${' +
      STANDARD_VAR_NAMES.ELEMENT_CSS +
      '}" is not positioned at ${px}px on the x axis',
  },
  {
    type: PatternType.ACTION,
    name: 'expect element is positioned at "n" px on the x axis',
    script:
      'Then I expect that element "${' +
      STANDARD_VAR_NAMES.ELEMENT_CSS +
      '}" is positioned at ${px}px on the x axis',
  },
  {
    type: PatternType.ACTION,
    name: 'expect element dimension is not "n" px tall',
    script:
      'Then I expect that element "${' + STANDARD_VAR_NAMES.ELEMENT_CSS + '}" is not ${px}px tall',
  },
  {
    type: PatternType.ACTION,
    name: 'expect element dimension is "n" px tall',
    script:
      'Then I expect that element "${' + STANDARD_VAR_NAMES.ELEMENT_CSS + '}" is ${px}px tall',
  },
  {
    type: PatternType.ACTION,
    name: 'expect element dimension is not "n" px broad',
    script:
      'Then I expect that element "${' + STANDARD_VAR_NAMES.ELEMENT_CSS + '}" is not ${px}px broad',
  },
  {
    type: PatternType.ACTION,
    name: 'expect element dimension is "n" px broad',
    script:
      'Then I expect that element "${' + STANDARD_VAR_NAMES.ELEMENT_CSS + '}" is ${px}px broad',
  },
  {
    type: PatternType.ACTION,
    name: 'expect cookie not exists',
    script: 'Then I expect that cookie "${cookieName}" not exists',
  },
  {
    type: PatternType.ACTION,
    name: 'expect cookie exists',
    script: 'Then I expect that cookie "${cookieName}" exists',
  },
  {
    type: PatternType.ACTION,
    name: 'expect cookie not contains',
    script: 'Then I expect that cookie "${cookieName}" not contains "${expectedValue}"',
  },
  {
    type: PatternType.ACTION,
    name: 'expect cookie contains',
    script: 'Then I expect that cookie "${cookieName}" contains "${expectedValue}"',
  },
  {
    type: PatternType.ACTION,
    name: 'expect element is not enabled',
    script: 'Then I expect that element "${' + STANDARD_VAR_NAMES.ELEMENT_CSS + '}" is not enabled',
  },
  {
    type: PatternType.ACTION,
    name: 'expect element is enabled',
    script: 'Then I expect that element "${' + STANDARD_VAR_NAMES.ELEMENT_CSS + '}" is enabled',
  },
  {
    type: PatternType.ACTION,
    name: 'expect element is not selected',
    script:
      'Then I expect that element "${' + STANDARD_VAR_NAMES.ELEMENT_CSS + '}" is not selected',
  },
  {
    type: PatternType.ACTION,
    name: 'expect element is selected',
    script: 'Then I expect that element "${' + STANDARD_VAR_NAMES.ELEMENT_CSS + '}" is selected',
  },
  {
    type: PatternType.ACTION,
    name: 'expect checkbox is not checked',
    script:
      'Then I expect that checkbox "${' + STANDARD_VAR_NAMES.ELEMENT_CSS + '}" is not checked',
  },
  {
    type: PatternType.ACTION,
    name: 'expect checkbox is checked',
    script: 'Then I expect that checkbox "${' + STANDARD_VAR_NAMES.ELEMENT_CSS + '}" is checked',
  },
  {
    type: PatternType.ACTION,
    name: 'expect font css attribute is not equal',
    script:
      'Then I expect that the font css attribute "${attrName}" from element "${' +
      STANDARD_VAR_NAMES.ELEMENT_CSS +
      '}" is not "${expectedValue}"',
  },
  {
    type: PatternType.ACTION,
    name: 'expect font css attribute is equal',
    script:
      'Then I expect that the font css attribute "${attrName}" from element "${' +
      STANDARD_VAR_NAMES.ELEMENT_CSS +
      '}" is "${expectedValue}"',
  },
  {
    type: PatternType.ACTION,
    name: 'expect font attribute is not equal',
    script:
      'Then I expect that the font attribute "${attrName}" from element "${' +
      STANDARD_VAR_NAMES.ELEMENT_CSS +
      '}" is not "${expectedValue}"',
  },
  {
    type: PatternType.ACTION,
    name: 'expect font attribute is equal',
    script:
      'Then I expect that the font attribute "${attrName}" from element "${' +
      STANDARD_VAR_NAMES.ELEMENT_CSS +
      '}" is "${expectedValue}"',
  },
  {
    type: PatternType.ACTION,
    name: 'expect css attribute is not equal',
    script:
      'Then I expect that the css attribute "${attrName}" from element "${' +
      STANDARD_VAR_NAMES.ELEMENT_CSS +
      '}" is not "${expectedValue}"',
  },
  {
    type: PatternType.ACTION,
    name: 'expect css attribute is equal',
    script:
      'Then I expect that the css attribute "${attrName}" from element "${' +
      STANDARD_VAR_NAMES.ELEMENT_CSS +
      '}" is "${expectedValue}"',
  },
  {
    type: PatternType.ACTION,
    name: 'expect attribute is not equal',
    script:
      'Then I expect that the attribute "${attrName}" from element "${' +
      STANDARD_VAR_NAMES.ELEMENT_CSS +
      '}" is not "${expectedValue}"',
  },
  {
    type: PatternType.ACTION,
    name: 'expect attribute is equal',
    script:
      'Then I expect that the attribute "${attrName}" from element "${' +
      STANDARD_VAR_NAMES.ELEMENT_CSS +
      '}" is "${expectedValue}"',
  },
  {
    type: PatternType.ACTION,
    name: 'expect url not contains',
    script: 'Then I expect the url to not contain "${url}"',
  },
  {
    type: PatternType.ACTION,
    name: 'expect url contains',
    script: 'Then I expect the url to contain "${url}"',
  },
  {
    type: PatternType.ACTION,
    name: 'expect url path is not equal',
    script: 'Then I expect that the path is not "${path}"',
  },
  {
    type: PatternType.ACTION,
    name: 'expect url path is equal',
    script: 'Then I expect that the path is "${path}"',
  },
  {
    type: PatternType.ACTION,
    name: 'expect url is not equal',
    script: 'Then I expect that the url is not "${url}"',
  },
  {
    type: PatternType.ACTION,
    name: 'expect url is equal',
    script: 'Then I expect that the url is "${url}"',
  },
  {
    type: PatternType.ACTION,
    name: 'expect element is not empty',
    script: 'Then I expect that element "${' + STANDARD_VAR_NAMES.ELEMENT_CSS + '}" is not empty',
  },
  {
    type: PatternType.ACTION,
    name: 'expect button is not empty',
    script: 'Then I expect that button "${' + STANDARD_VAR_NAMES.ELEMENT_CSS + '}" is not empty',
  },
  {
    type: PatternType.ACTION,
    name: 'expect element is empty',
    script: 'Then I expect that element "${' + STANDARD_VAR_NAMES.ELEMENT_CSS + '}" is empty',
  },
  {
    type: PatternType.ACTION,
    name: 'expect button is empty',
    script: 'Then I expect that button "${' + STANDARD_VAR_NAMES.ELEMENT_CSS + '}" is empty',
  },
  {
    type: PatternType.ACTION,
    name: 'expect element not contains any text',
    script:
      'Then I expect that element "${' +
      STANDARD_VAR_NAMES.ELEMENT_CSS +
      '}" not contains any text',
  },
  {
    type: PatternType.ACTION,
    name: 'expect button not contains any text',
    script:
      'Then I expect that button "${' + STANDARD_VAR_NAMES.ELEMENT_CSS + '}" not contains any text',
  },
  {
    type: PatternType.ACTION,
    name: 'expect element contains any text',
    script:
      'Then I expect that element "${' + STANDARD_VAR_NAMES.ELEMENT_CSS + '}" contains any text',
  },
  {
    type: PatternType.ACTION,
    name: 'expect button contains any text',
    script:
      'Then I expect that button "${' + STANDARD_VAR_NAMES.ELEMENT_CSS + '}" contains any text',
  },
  {
    type: PatternType.ACTION,
    name: 'expect element not contains the text',
    script:
      'Then I expect that element "${' +
      STANDARD_VAR_NAMES.ELEMENT_CSS +
      '}" not contains the text "{text}"',
  },
  {
    type: PatternType.ACTION,
    name: 'expect button not contains the text',
    script:
      'Then I expect that button "${' +
      STANDARD_VAR_NAMES.ELEMENT_CSS +
      '}" not contains the text "{text}"',
  },
  {
    type: PatternType.ACTION,
    name: 'expect container not contains the text',
    script:
      'Then I expect that container "${' +
      STANDARD_VAR_NAMES.ELEMENT_CSS +
      '}" not contains the text "{text}"',
  },
  {
    type: PatternType.ACTION,
    name: 'expect element contains the text',
    script:
      'Then I expect that element "${' +
      STANDARD_VAR_NAMES.ELEMENT_CSS +
      '}" contains the text "{text}"',
  },
  {
    type: PatternType.ACTION,
    name: 'expect button contains the text',
    script:
      'Then I expect that button "${' +
      STANDARD_VAR_NAMES.ELEMENT_CSS +
      '}" contains the text "{text}"',
  },
  {
    type: PatternType.ACTION,
    name: 'expect container contains the text',
    script:
      'Then I expect that container "${' +
      STANDARD_VAR_NAMES.ELEMENT_CSS +
      '}" contains the text "{text}"',
  },
  {
    type: PatternType.ACTION,
    name: 'expect element not matches the text',
    script:
      'Then I expect that element "${' +
      STANDARD_VAR_NAMES.ELEMENT_CSS +
      '}" not matches the text "${text}"',
  },
  {
    type: PatternType.ACTION,
    name: 'expect element matches the text',
    script:
      'Then I expect that element "${' +
      STANDARD_VAR_NAMES.ELEMENT_CSS +
      '}" matches the text "${text}"',
  },
  {
    type: PatternType.ACTION,
    name: 'expect button not matches the text',
    script:
      'Then I expect that button "${' +
      STANDARD_VAR_NAMES.ELEMENT_CSS +
      '}" not matches the text "${text}"',
  },
  {
    type: PatternType.ACTION,
    name: 'expect button matches the text',
    script:
      'Then I expect that button "${' +
      STANDARD_VAR_NAMES.ELEMENT_CSS +
      '}" matches the text "${text}"',
  },
  {
    type: PatternType.ACTION,
    name: 'expect element not contains the same text as element',
    script:
      'Then I expect that element "${' +
      STANDARD_VAR_NAMES.ELEMENT_CSS +
      '}" not contains the same text as element "${element2Css}"',
  },
  {
    type: PatternType.ACTION,
    name: 'expect element contains the same text as element',
    script:
      'Then I expect that element "${' +
      STANDARD_VAR_NAMES.ELEMENT_CSS +
      '}" contains the same text as element "${element2Css}"',
  },
  {
    type: PatternType.ACTION,
    name: 'expect element does not exist',
    script: 'Then I expect that element "${' + STANDARD_VAR_NAMES.ELEMENT_CSS + '}" does not exist',
  },
  {
    type: PatternType.ACTION,
    name: 'expect element does exist',
    script: 'Then I expect that element "${' + STANDARD_VAR_NAMES.ELEMENT_CSS + '}" does exist',
  },
  {
    type: PatternType.ACTION,
    name: 'expect element is not within the viewport',
    script:
      'Then I expect that element "${' +
      STANDARD_VAR_NAMES.ELEMENT_CSS +
      '}" is not within the viewport',
  },
  {
    type: PatternType.ACTION,
    name: 'expect element is within the viewport',
    script:
      'Then I expect that element "${' +
      STANDARD_VAR_NAMES.ELEMENT_CSS +
      '}" is within the viewport',
  },
  {
    type: PatternType.ACTION,
    name: 'expect element becomes not displayed',
    script:
      'Then I expect that element "${' +
      STANDARD_VAR_NAMES.ELEMENT_CSS +
      '}" becomes not displayed',
  },
  {
    type: PatternType.ACTION,
    name: 'expect element becomes displayed',
    script:
      'Then I expect that element "${' + STANDARD_VAR_NAMES.ELEMENT_CSS + '}" becomes displayed',
  },
  {
    type: PatternType.ACTION,
    name: 'expect element is not displayed',
    script:
      'Then I expect that element "${' + STANDARD_VAR_NAMES.ELEMENT_CSS + '}" is not displayed',
  },
  {
    type: PatternType.ACTION,
    name: 'expect element is displayed',
    script: 'Then I expect that element "${' + STANDARD_VAR_NAMES.ELEMENT_CSS + '}" is displayed',
  },
  {
    type: PatternType.ACTION,
    name: 'expect element does not appear exactly "n" times',
    script:
      'Then I expect that element "${' +
      STANDARD_VAR_NAMES.ELEMENT_CSS +
      '}" does not appear exactly "${n}" times',
  },
  {
    type: PatternType.ACTION,
    name: 'expect element does appear exactly "n" times',
    script:
      'Then I expect that element "${' +
      STANDARD_VAR_NAMES.ELEMENT_CSS +
      '}" does appear exactly "${n}" times',
  },
  {
    type: PatternType.ACTION,
    name: 'expect title not contains',
    script: 'Then I expect that the title not contains "${text}"',
  },
  {
    type: PatternType.ACTION,
    name: 'expect title contains',
    script: 'Then I expect that the title contains "${text}"',
  },
  {
    type: PatternType.ACTION,
    name: 'expect title is not equal',
    script: 'Then I expect that the title is not "${text}"',
  },
  {
    type: PatternType.ACTION,
    name: 'expect title is equal',
    script: 'Then I expect that the title is "${text}"',
  },
  {
    type: PatternType.ACTION,
    name: 'move to element with an offset',
    script:
      'When I move to element "${' +
      STANDARD_VAR_NAMES.ELEMENT_CSS +
      '}" with an offset of ${x},${y}',
  },
  {
    type: PatternType.ACTION,
    name: 'move to element',
    script: 'When I move to element "${' + STANDARD_VAR_NAMES.ELEMENT_CSS + '}"',
  },
  {
    type: PatternType.ACTION,
    name: 'select option with text for element',
    script:
      'When I select the option with the text "${text}" for element "${' +
      STANDARD_VAR_NAMES.ELEMENT_CSS +
      '}"',
  },
  {
    type: PatternType.ACTION,
    name: 'select option with value for element',
    script:
      'When I select the option with the value "${value}" for element "${' +
      STANDARD_VAR_NAMES.ELEMENT_CSS +
      '}"',
  },
  {
    type: PatternType.ACTION,
    name: 'select option with name for element',
    script:
      'When I select the option with the name "${name}" for element "${' +
      STANDARD_VAR_NAMES.ELEMENT_CSS +
      '}"',
  },
  {
    type: PatternType.ACTION,
    name: 'select option by index for element',
    script:
      'When I select the "${index}" option for element "${' + STANDARD_VAR_NAMES.ELEMENT_CSS + '}"',
  },
  {
    type: PatternType.ACTION,
    name: 'focus last opened window',
    script: 'When I focus the last opened window',
  },
  {
    type: PatternType.ACTION,
    name: 'focus last opened tab',
    script: 'When I focus the last opened tab',
  },
  {
    type: PatternType.ACTION,
    name: 'close last opened window',
    script: 'When I close the last opened window',
  },
  {
    type: PatternType.ACTION,
    name: 'close last opened tab',
    script: 'When I close the last opened tab',
  },
  {
    type: PatternType.ACTION,
    name: 'scroll to element',
    script: 'When I scroll to element "${' + STANDARD_VAR_NAMES.ELEMENT_CSS + '}"',
  },
  {
    type: PatternType.ACTION,
    name: 'set prompt text',
    script: 'When I enter "${text}" into the prompt',
  },
  {
    type: PatternType.ACTION,
    name: 'accept alertbox',
    script: 'When I accept the alertbox',
  },
  {
    type: PatternType.ACTION,
    name: 'accept confirmbox',
    script: 'When I accept the confirmbox',
  },
  {
    type: PatternType.ACTION,
    name: 'accept prompt',
    script: 'When I accept the prompt',
  },
  {
    type: PatternType.ACTION,
    name: 'dismiss prompt',
    script: 'When I dismiss the prompt',
  },
  {
    type: PatternType.ACTION,
    name: 'dismiss confirmbox',
    script: 'When I dismiss the confirmbox',
  },
  {
    type: PatternType.ACTION,
    name: 'dismiss alertbox',
    script: 'When I dismiss the alertbox',
  },
  {
    type: PatternType.ACTION,
    name: 'press key',
    script: 'When I press "${key}"',
  },
  {
    type: PatternType.ACTION,
    name: 'delete cookies',
    script: 'When I delete the cookie "${cookieName}"',
  },
  {
    type: PatternType.ACTION,
    name: 'set cookie',
    script: 'When I set a cookie "${cookieName}" with the content "${cookieContent}"',
  },
  {
    type: PatternType.ACTION,
    name: 'pause',
    script: 'When I pause for ${ms}ms',
  },
  {
    type: PatternType.ACTION,
    name: 'drag element',
    script:
      'When I drag element "${' +
      STANDARD_VAR_NAMES.ELEMENT_CSS +
      '}" to element "${' +
      STANDARD_VAR_NAMES.PARENT_ELEMENT_CSS +
      '}"',
  },
  {
    type: PatternType.ACTION,
    name: 'clear',
    script: 'When I clear the inputfield "${' + STANDARD_VAR_NAMES.ELEMENT_CSS + '}"',
  },
  {
    type: PatternType.ACTION,
    name: 'set input text',
    script: 'When I set "${text}" to the inputfield "${' + STANDARD_VAR_NAMES.ELEMENT_CSS + '}"',
  },
  {
    type: PatternType.ACTION,
    name: 'add input text',
    script: 'When I add "${text}" to the inputfield "${' + STANDARD_VAR_NAMES.ELEMENT_CSS + '}"',
  },
  {
    type: PatternType.ACTION,
    name: 'click',
    script: 'When I click on the element "${' + STANDARD_VAR_NAMES.ELEMENT_CSS + '}"',
  },
  {
    type: PatternType.ACTION,
    name: 'click link',
    script: 'When I click on the link "${link}"',
  },
  {
    type: PatternType.ACTION,
    name: 'doubleclick',
    script: 'When I doubleclick on the element "${' + STANDARD_VAR_NAMES.ELEMENT_CSS + '}"',
  },
  {
    type: PatternType.ACTION,
    name: 'doubleclick link',
    script: 'When I doubleclick on the link "${link}"',
  },
];

module.exports.up = async function () {
  const framework: FrameworkEntityWithId = await frameworkMongoService.getFrameworkByName(
    'WebdriverIO Cucumber Boilerplate',
  );
  await patternMongoService.bulkInsertPatterns(
    patterns.map((pattern) => ({
      ...pattern,
      frameworkId: framework._id,
    })),
  );
};

module.exports.down = async function () {
  await patternMongoService.bulkRemovePatterns(
    'name',
    patterns.map((pattern) => pattern.name),
  );
};
