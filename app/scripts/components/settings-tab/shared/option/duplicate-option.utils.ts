import { Entity } from '../../../../shared/entity/entity';
import { CommonService } from '../../../../shared/common-service';
import { showToast } from '../../../shared/toasts-component';
import { checkForDuplicates } from './save-option.utils';

/**
 * Configuration params for duplicating options
 */
interface IDuplicateConfig {
  service: CommonService<any>;
  dependencies?: any[];
  uniqueFields: string[];
  create: Function;
};

/**
 * Make a copy of chosen entity and inserts in after it
 * Returns new entity
 * @param id {string | null} - an existing option id
 * @param config {IDuplicateConfig} - operation configuration
*/
export function duplicateOption(id: string, config: IDuplicateConfig) {
  const {service, uniqueFields, dependencies, create} = config;
  try {
    console.log('duplicate: ', id);
    const item = service.findById(id);
    const itemIndex = service.getIndex(id);
    const newName = generateNewName(item, {service, uniqueFields});
    checkForDuplicates(item, newName, {service, uniqueFields});
    const newEntity = create(newName, item);
    chainClone(item, newEntity, {service, dependencies}, itemIndex + 1);
    return newEntity;
  } catch (error) {
    const message = (error as Error).message;
    showToast(message, 'danger');
    return false;
  };
}

/**
 * Adds number to the existing name, if name is number, then increases it by 1
 * @param item {any} - current entity item
 * @param service {CommonService<any>} - service containing operations with entity
 * @param uniqueFields {string[]} - names of properties to check for uniqueness
*/
export function generateNewName(
  item: any,
  {service, uniqueFields}: Pick<IDuplicateConfig, 'service' | 'uniqueFields'>
): string {
  // get names of existing enities
  const entityNames = service.getMany()
    .filter( (entity: any) => uniqueFields.every(key => item[key] === entity[key]))
    .map( (entity: any) => entity.name );

  // get names of entities which has been already replicated from current entity
  const childNames = entityNames.filter( (name: string) => {
    return name.includes(`${item.name}_`);
  } );

  // get their numbers
  const childNumbers: number[] = childNames.map( (name: string) => {
    const arrFromName = name.split('_');
    const childNumber = parseInt(arrFromName[arrFromName.length - 1]);
    return !isNaN(childNumber) ? childNumber : 0;
  } );

  // get maximum number
  const maxNumber = childNumbers.length ? Math.max.apply(null, childNumbers) : 0;

  // the number of the new name will be the maximum number + 1
  return `${item.name}_${maxNumber + 1}`;
}

/**
 * Clones entity and all its dependencies
 * @param originalItem {Entity} - an original entity
 * @param clonedItem {any} - a cloned entity
 * @param service {CommonService<any>} - a service that operates on current entity
 * @param index {number<any>} - index for insertion
 * @param dependencies {any[]} - dependencies settings
*/
function chainClone(
  originalItem: Entity,
  clonedItem: any,
  {service, dependencies}: Pick<IDuplicateConfig, 'service' | 'dependencies'>,
  index?: number
): void {
  if (originalItem && dependencies && dependencies.length) {
    console.log('cloning dependencies of: ', originalItem);
    dependencies.forEach(dependency => {

      const originalDepItems = dependency.service.getMany()
        .filter( (depItem: any) => depItem[dependency.valueKey] === originalItem.id);

      const subDependencies = dependency.dependencies || [];

      originalDepItems.forEach( (depItem: any) => {
        const clonedDepItem = dependency.create(
          depItem.name,
          {...depItem, [dependency.valueKey]: clonedItem.id}
        );
        chainClone(
          depItem,
          clonedDepItem,
          {service: dependency.service, dependencies:subDependencies},
          0
        );
      });
    });
  }
  service.add(clonedItem, index);
  console.log('duplicated: ', originalItem);
}
