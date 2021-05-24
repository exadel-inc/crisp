import { ISettingsOption } from '../options/options.component';

/**
 * Every key is a property name of <ISettingsOption> which is used for filtering
 */
export interface IOptionsFilter {
  [key: string]: string;
};

/**
 * Flter passed options by filter params
 * @param options {ISettingsOption[]} - options for filtering
 * @param filter {IOptionsFilter} - object with filter params
 * @returns ISettingsOption[] - filtered options
 */
export function filterOptions(options: ISettingsOption[], filter: IOptionsFilter): ISettingsOption[] {
  return options.filter( (option: ISettingsOption) => {
    return Object.entries(filter).every(
      ([key, value]: [string, string]) => {
        const entityKey = ( option[key as keyof ISettingsOption] || '' ) as string;
        return entityKey.toLowerCase().includes(value.toLowerCase());
      }
    );
  } );
};
