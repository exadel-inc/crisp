import { Entity } from '../../../../shared/entity/entity';
import { CommonService } from '../../../../shared/common-service';
import { showToast } from '../../../../components/shared/toasts-component';

/**
 * Configuration params for removing options
 */
interface IRemoveConfig {
  service: CommonService<any>;
  fullEntityName: string;
  links?: any[];
  dependencies?: any[];
  callback?: () => void;
};

/**
 * Removes entity from storage
 * @param item {Entity} - an entity that should be removed
 * @param config {IRemoveConfig} - operation configuration
*/
export function removeOption(item: Entity, config: IRemoveConfig): void {
  const {service, links, dependencies, callback} = config;
  try {
    checkForLinkedEntities(item, links);
    chainDelete(item, service, dependencies);

    if (callback) {
      callback();
    }
  } catch (error) {
    const message = (error as Error).message;
    showToast(message, 'danger');
  }
};

/**
 * Check for existing entity links
 * If any other entities that use current entity exist, throws an error
 * @param item {Entity} - an existing entity
 * @param links {any[]} - links settings
*/
function checkForLinkedEntities(
  item: Entity,
  links?: any[]
): void {
  if (item && links && links.length) {
    links.forEach(link => {
      const linkedItems = link.service.getMany().filter( (linkedItem: any) => linkedItem[link.valueKey] === item.id);
      if (linkedItems && linkedItems.length) {
        const linkedEntityName = link.storageKey ? `The following  ${link.storageKey}` : 'Some entities';
        throw new Error(`Unable to delete because of dependency. ${linkedEntityName} are using this ${link.valueKey}:
          ${linkedItems.map( (linkedItem: any) => linkedItem.name).join(', ')}`);
      }
    });
  }
}

/**
 * Deletes entity and all its dependencies
 * @param item {Entity} - an existing entity
 * @param service {CommonService<any>} - a service that operates on current entity
 * @param dependencies {any[]} - dependencies settings
*/
function chainDelete(
  item: Entity,
  service: CommonService<any>,
  dependencies?: any[]
) {
  if (item && dependencies && dependencies.length) {
    console.log('removing dependencies of: ', item);
    dependencies.forEach(dependency => {
      const depItems = dependency.service.getMany().filter( (depItem: any) => depItem[dependency.valueKey] === item.id);
      const subDependencies = dependency.dependencies || [];
      depItems.forEach( (depItem: any) => chainDelete(depItem, dependency.service, subDependencies));
    });
  }
  service.remove(item.id);
  console.log('removed: ', item);
}
