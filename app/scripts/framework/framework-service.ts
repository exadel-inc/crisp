import { Framework } from './framework';
import { AddType, CommonService } from '../shared/common-service';
import { commonStorageService } from '../storage/common-storage-service';
import { STANDARD_FRAMEWORKS } from './standard-frameworks';
import { StoreToStorageService } from '../storage/store-to-storage.service';
import clone from 'lodash/clone';

export class FrameworkService implements CommonService<Framework> {

  private _storage: StoreToStorageService<Framework>;

  constructor() {
    this._storage = commonStorageService.registerStorage<Framework>('framework', this._constructorFn, STANDARD_FRAMEWORKS);
    this._init();
  }

  /**
   * Returns all frameworks.
  */
  public getMany(): Framework[] {
    return this._storageFrameworks;
  }

  /**
   * Returns first framework that match all criterias.
   * @param name {string} Framework name.
  */
  public find(name: string): Framework | undefined {
    return this._storageFrameworks.find(fr => this._isSameFramework(fr, name));
  }

  /**
   * Returns first framework that has same id.
   * @param name {id} Framework id.
  */
  public findById(id: string): Framework | undefined {
    return this._storageFrameworks.find((fr: Framework) => fr.id === id);
  }

  /**
   * Returns the index of the framework that has same id.
   * Returns -1 if no framework found
   * @param id {string} Framework id.
  */
  public getIndex(id: string): number {
    return this._storageFrameworks.findIndex((fr: Framework) => fr.id === id);
  }

  /**
   * Saves framework to storage.
   * If framework with same id exists, logs error in console and doesn't save.
   * @param framework {Framework} Framework to save.
   * @param index {number} The index at which the new framework should be inserted in the list. Default is 0
  */
  public add(framework: Framework, index: number = 0): void {
    if (this.findById(framework.id)) {
      throw new Error('Unable to save. Framework already exist');
    } else {
      // a case when entity data doesn't have methods
      framework.setDate && framework.setDate();
      const elements: Framework[] = this._storageFrameworks;
      elements.splice(index, 0, framework);
      this._storage.write(elements);
    }
  }

  /**
   * Saves frameworks to storage.
   * @param frameworks {Framework[]} Frameworks to save.
   * @param addType {AddType} Possible conflicts resolving logic:
   * FORCE_OVERRIDE - add new records and delete old ones
   * OVERWRITE_OLDER - owerwrite based on date
   * SKIP_EXISTING - do not replace existing records
  */
  public addMany(frameworks: Framework[], addType = AddType.FORCE_OVERRIDE): void {
    // a case when entity data doesn't have methods
    frameworks.forEach((framework: Framework) => {
      framework.setDate && framework.setDate();
    });
    switch (addType) {
      case AddType.FORCE_OVERRIDE: {
        this._storage.write(frameworks);
        break;
      }
      case AddType.OVERWRITE_OLDER: {
        const newFrameworks = this._storageFrameworks;
        frameworks.forEach((framework: Framework) => {
          const sameFramework = newFrameworks.find((fr: Framework) => fr.id === framework.id);
          if (sameFramework) {
            if (framework > sameFramework) {
              const sameFrameworkIdx = newFrameworks.indexOf(sameFramework);
              newFrameworks[sameFrameworkIdx] = framework;
            }
          } else {
            newFrameworks.splice(0, 0, framework);
          }
        });
        this._storage.write(newFrameworks);
        break;
      }
      case AddType.SKIP_EXISTING: {
        const newFrameworks = this._storageFrameworks;
        frameworks.forEach((framework: Framework) => {
          const sameFramework = newFrameworks.find((fr: Framework) => fr.id === framework.id);
          if (!sameFramework) {
            newFrameworks.splice(0, 0, framework);
          }
        });
        this._storage.write(newFrameworks);
        break;
      }
      default: break;
    }
  }

  /**
   * Deletes framework from storage.
   * If framework doesn't exist, logs error in console and doesn't remove.
   * @param id {string} Framework id.
  */
  public remove(id: string): void {
    if (!this.findById(id)) {
      throw new Error('Unable to remove. Framework doesn`t exist');
    } else {
      const frameworks: Framework[] = this._storageFrameworks.filter(fr => fr.id !== id);
      this._storage.write(frameworks);
    }
  }

  /**
   * Updates framework with provided id.
   * @param id {string} framework id.
   * @param dataToUpdate {Partial<Framework>} Data to be updated in old framework to create new one.
  */
  public update(id: string, dataToUpdate: Partial<Framework>): void {
    if (!this.findById(id)) {
      throw new Error('Unable to update. Framework doesn`t exist');
    } else {
      const frameworks: Framework[] = this._storageFrameworks.map(el => el.id === id ? {...el, ...dataToUpdate} as Framework : el);
      this._storage.write(frameworks);
    }
  }

  /**
   * Deletes all frameworks from storage
  */
  public removeAll(): void {
    this._storage.write([]);
  }

  /**
   * Clones the framework (only the object itself without dependencies)
   * @param framework {Framework} framework.
  */
  public clone(framework: Framework): Framework {
    return this._constructorFn(clone(framework));
  }

  /**
   * Checks if current item is a valid Framework (using duck typing)
   * @param item {unknown} an item for check
  */
  public isValid(item: unknown): boolean {
    if (item && typeof item === 'object') {
      const validPropNames = ['name'];
      return validPropNames.every(propName => Object.keys(item).includes(propName));
    }
    return false;
  }

  private _isSameFramework(fr: Framework, name: string): boolean {
    return (fr.name === name);
  }

  /**
   * Frameworks that are stored in storage.
  */
  private get _storageFrameworks(): Framework[] {
    return this._storage.read();
  }

  /**
   * Analyze the storage, and if no frameworks, add default one.
  */
  private _init(): void {
    if (this._storageFrameworks.length === 0) {
      const frameworks = STANDARD_FRAMEWORKS;
      this._storage.write(frameworks);
    }
  }

  /**
   * Framework constructor.
  */
  private _constructorFn(fr: any) {
    return  new Framework(fr.name, fr.description, fr._id, fr.date);
  }
}
