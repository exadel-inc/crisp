import { Pattern } from '../../patterns/pattern';

export interface ActionListItem {
  pattern: Pattern;
  checked: boolean;
}

export interface CustomVars {
  [key: string]: string | undefined;
}
