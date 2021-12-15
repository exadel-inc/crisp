import { ValidationError } from '@nestjs/common';
import { ErrorTypeEnum } from '../enums';

interface CreateError {
  readonly message: ErrorTypeEnum;
  readonly property: string;
}

export function errorParser(errors: ValidationError[]): Record<string, unknown>[] {
  return errors.map(({ property, constraints, children }) => {
    return Object.assign(
      { property },
      constraints && { constraints: Object.keys(constraints) },
      children.length && { children: errorParser(children) },
    );
  });
}

export const createError = (message: ErrorTypeEnum, property: string): CreateError => ({
  message,
  property,
});
