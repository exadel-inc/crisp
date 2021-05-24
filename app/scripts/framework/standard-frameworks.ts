import { initialDate } from '../shared/initial-date';
import { Framework } from './framework';

/**
 * Built-in frameworks
*/
export const STANDARD_FRAMEWORKS = [
  new Framework(
    'WebdriverIO Cucumber Boilerplate',
    'Cucumber Boilerplate\n\nStep patterns from Cucumber Boilerplate project to run WebdriverIO (v7) tests with Cucumber and brings true BDD to JavaScript.\n\nhttps://github.com/webdriverio/cucumber-boilerplate',
    '5fa19dd690f43c0002000001',
    initialDate,
  ),
];

/**
 * Built-in cucumber framework id
*/
export const CUCUMBER = STANDARD_FRAMEWORKS[0].id;
