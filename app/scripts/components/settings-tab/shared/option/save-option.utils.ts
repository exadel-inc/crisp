import { CommonService } from '../../../../shared/common-service';
import { showToast } from '../../../shared/toasts-component';
import { Pattern } from '../../../../patterns/pattern';
import { IEditorData } from '../interfaces';

/**
 * Configuration params for removing options
 */
export interface ISaveConfig {
  service: CommonService<any>;
  uniqueFields: string[];
  requiredFields: string[];
};

/**
 * Configuration params for updating options
 */
export interface IUpdateConfig extends ISaveConfig {
  editorData: IEditorData;
};

/**
 * Saves new or updates exicting entity
 * @param option {any} - an existing entity in case of saving
 * @param config {ISaveConfig} - operation configuration
*/
export const saveOption = (option: any, config: ISaveConfig, callbackFn: () => void): void => {
  const {service, uniqueFields, requiredFields} = config;

  const isValid = requiredFields.every( (key) => {
    return !!option[key];
  } );

  if (isValid) {
    try {
      checkForDuplicates(option, option.name, {service, uniqueFields});
      service.add(option);
      console.log('saved: ', option);
      callbackFn();
    } catch (error) {
      const message = (error as Error).message;
      showToast(message, 'danger');
    };
  } else {
    showToast('Please fill all the mandatory fields', 'danger');
  }
};

/**
 * Saves new or updates exicting entity
 * @param option {any} - an existing entity's id in case of updating
 * @param config {IUpdateConfig} - operation configuration
*/
export const updateOption = (id: string, config: IUpdateConfig, callbackFn: () => void): void => {
  const {service, uniqueFields, editorData, requiredFields} = config;

  const option = service.findById(id);

  if (!option) return;

  const isValid = requiredFields.every( (key) => {
    return editorData.hasOwnProperty(key) ? !!(editorData as any)[key] : !!option[key];
  } );

  if (isValid) {
    try {
      checkForDuplicates(option, editorData.name, {service, uniqueFields});
      service.update(id, editorData);
      console.log('updated: ', option, editorData);
      callbackFn();
    } catch (error) {
      const message = (error as Error).message;
      showToast(message, 'danger');
    };
  } else {
    showToast('Please fill all the mandatory fields', 'danger');
  }
};

/**
 * Checks if the option doesn't exist
 * @param entity {any} - entity which should be checked
 * @param name {any} - the name of the entity which should be checked
 * @param service {CommonService<any>} - service containing operations with entity
 * @param uniqueFields {string[]} - names of properties to check for uniqueness
*/
export function checkForDuplicates(
  entity: any,
  name: string,
  {service, uniqueFields}: Pick<ISaveConfig, 'service' | 'uniqueFields'>
): void {
  let findArguments = uniqueFields.map(key => entity[key]);

  // Pattern class includes several types of entities
  // we need to check uniqueness of entity only within its type
  if (entity instanceof Pattern) {
    findArguments = [entity.type, entity.framework, ...findArguments];
  }

  const fullDuplicate = service.find(name, ...findArguments);
  if (fullDuplicate && fullDuplicate.id !== entity.id) {
    const additionalErrorFields = uniqueFields.length ? ` and selected ${uniqueFields.join(', ')}` : '';
    const errors = `name: "${name}" ${additionalErrorFields}`;
    throw new Error(`Unable to save. A record with ${errors} already exists`);
  }
}

/**
 * Sets the option as the default
 * @param option {any} - option which should be marked as the default
 * @param service {CommonService<any>} - service containing operations with the option
*/
export function changeDefaultOption(option: any, service: CommonService<any>) {
  service.update(option.id, {isDefault: true});
}
