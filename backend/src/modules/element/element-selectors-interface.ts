import { Types } from 'mongoose';

export interface ElementSelectors {
  readonly elementId?: Types.ObjectId;
  readonly elementCss?: string;
  readonly elementXPath?: string;
}

export interface ElementPatternData {
  readonly id: Types.ObjectId;
  readonly customVars: {
    [key: string]: string | undefined;
  };
}
