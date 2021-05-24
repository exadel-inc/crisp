export interface ElementSelectors {
  elementId?: string;
  elementCss?: string;
  elementXPath?: string;
}

export interface ElementPatternData {
  id: string;
  customVars: {
    [key: string]: string | undefined;
  };
}
