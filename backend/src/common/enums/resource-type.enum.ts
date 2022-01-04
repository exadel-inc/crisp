export enum ResourceTypeEnum {
  PROJECT = 'PROJECT',
  FRAMEWORK = 'FRAMEWORK',
  PAGE = 'PAGE',
  ELEMENT = 'ELEMENT',
  PATTERN = 'PATTERN',
  SELECTOR = 'SELECTOR',
}

export const resources = Object.keys(ResourceTypeEnum).map((resource) => ({
  name: resource,
}));
