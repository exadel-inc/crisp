import { initialDate } from '../shared/initial-date';
import { Project } from './project';

/**
 * Built-in demo projects
*/
export const STANDARD_PROJECTS = [
  new Project(
    'Demo',
    '5fa19dd690f43c0002000001',
    'Demo Wiki project',
    true,
    '5fa19dd690f43c0002100001',
    initialDate,
  ),
];