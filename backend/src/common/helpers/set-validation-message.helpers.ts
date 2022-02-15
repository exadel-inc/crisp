import { ValidationArguments } from 'class-validator';

export const setValidationMessage =
  (message: string) =>
  (arg: ValidationArguments): string =>
    `${message} ${arg.constraints.join('')} chars`;
