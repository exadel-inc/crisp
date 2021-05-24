import { CrispElement } from './element';
import { AddType, CommonService } from '../shared/common-service';
import { commonStorageService } from '../storage/common-storage-service';
import { StoreToStorageService } from '../storage/store-to-storage.service';
import clone from 'lodash/clone';
import { STANDARD_ELEMENTS } from './standard-elements';

export class ElementService implements CommonService<CrispElement> {

  private _storage: StoreToStorageService<CrispElement>;

  constructor() {
    this._storage = commonStorageService.registerStorage<CrispElement>('elements', this._constructorFn, STANDARD_ELEMENTS);
  }

  /**
   * Returns all elements of current page (if defined).
   * If page is omitted, returns elements from all pages.
   * @param page {string} Element page data.
  */
  public getMany(page?: string): CrispElement[] {
    return this._storageElements.filter(el => this._isOfSameQuery(el, page));
  }

  /**
   * Returns first element that match all criterias.
   * If any of parameters is omitted, takes the first element taken from all kinds of this parameter.
   * @param name {string} Element name.
   * @param page {ElementPageData} Element page data.
  */
  public find(name: string, page?: string): CrispElement | undefined {
    return this._storageElements.find(el => this._isSameElement(el, name, page));
  }

  /**
   * Returns first element that has same id.
   * @param name {id} Element id.
  */
  public findById(id: string): CrispElement | undefined {
    return this._storageElements.find((el: CrispElement) => el.id === id);
  }

  /**
   * Returns the index of the element that has same id.
   * Returns -1 if no element found
   * @param id {string} Element id.
  */
  public getIndex(id: string): number {
    return this._storageElements.findIndex((el: CrispElement) => el.id === id);
  }

  /**
   * Saves element to storage.
   * If element with same id exists, logs error in console and doesn't save.
   * @param element {CrispElement} Element to save.
   * @param index {number} The index at which the new element should be inserted in the list. Default is 0
  */
  public add(element: CrispElement, index: number = 0): void {
    if (this.findById(element.id)) {
      throw new Error('Unable to save. Element already exist');
    } else {
      // a case when entity data doesn't have methods
      element.setDate && element.setDate();
      const elements: CrispElement[] = this._storageElements;
      elements.splice(index, 0, element);
      this._storage.write(elements);
    }
  }

  /**
   * Saves elements to storage.
   * @param elements {CrispElement[]} Elements to save.
   * @param addType {AddType} Possible conflicts resolving logic:
   * FORCE_OVERRIDE - add new records and delete old ones
   * OVERWRITE_OLDER - owerwrite based on date
   * SKIP_EXISTING - do not replace existing records
  */
  public addMany(elements: CrispElement[], addType = AddType.FORCE_OVERRIDE): void {
    // a case when entity data doesn't have methods
    elements.forEach((element: CrispElement) => {
      element.setDate && element.setDate();
    });
    switch (addType) {
      case AddType.FORCE_OVERRIDE: {
        this._storage.write(elements);
        break;
      }
      case AddType.OVERWRITE_OLDER: {
        const newElements = this._storageElements;
        elements.forEach((element: CrispElement) => {
          const sameElement = newElements.find((el: CrispElement) => el.id === element.id);
          if (sameElement) {
            if (element > sameElement) {
              const sameElementIdx = newElements.indexOf(sameElement);
              newElements[sameElementIdx] = element;
            }
          } else {
            newElements.splice(0, 0, element);
          }
        });
        this._storage.write(newElements);
        break;
      }
      case AddType.SKIP_EXISTING: {
        const newElements = this._storageElements;
        elements.forEach((element: CrispElement) => {
          const sameElement = newElements.find((el: CrispElement) => el.id === element.id);
          if (!sameElement) {
            newElements.splice(0, 0, element);
          }
        });
        this._storage.write(newElements);
        break;
      }
      default: break;
    }
  }

  /**
   * Deletes element from storage.
   * If element doesn't exist, logs error in console and doesn't remove.
   * @param id {string} Element id.
  */
  public remove(id: string): void {
    if (!this.findById(id)) {
      throw new Error('Unable to remove. Element doesn`t exist');
    } else {
      const elements: CrispElement[] = this._storageElements.filter(el => el.id !== id);
      this._storage.write(elements);
    }
  }

  /**
   * Updates element with provided id.
   * @param id {string} element id.
   * @param dataToUpdate {Partial<CrispElement>} Data to be updated in old element to create new one.
  */
  public update(id: string, dataToUpdate: Partial<CrispElement>): void {
    if (!this.findById(id)) {
      throw new Error('Unable to update. Element doesn`t exist');
    } else {
      const elements: CrispElement[] = this._storageElements.map(el => el.id === id ? {...el, ...dataToUpdate} as CrispElement : el);
      this._storage.write(elements);
    }
  }

  /**
   * Deletes all elements from storage
  */
  public removeAll(): void {
    this._storage.write([]);
  }

  /**
   * Clones the element (only the object itself without dependencies)
   * @param element {CrispElement} element.
  */
  public clone(element: CrispElement): CrispElement {
    return this._constructorFn(clone(element));
  }

  /**
   * Checks if current item is a valid Element (using duck typing)
   * @param item {unknown} an item for check
  */
  public isValid(item: unknown): boolean {
    if (item && typeof item === 'object') {
      const validPropNames = ['name', 'description', 'page', 'selectors', 'pageObjectPattern', 'actionPatterns'];
      return validPropNames.every(propName => Object.keys(item).includes(propName));
    }
    return false;
  }

  private _isOfSameQuery(el: CrispElement, page?: string): boolean {
    return ((el.page === page) || !page);
  }

  private _isSameElement(el: CrispElement, name: string, page?: string): boolean {
    return (el.name === name) && this._isOfSameQuery(el, page);
  }

  /**
   * Elements that are stored in storage.
  */
  private get _storageElements(): CrispElement[] {
    return this._storage.read();
  }

  /**
   * Elements constructor.
  */
  private _constructorFn(el: any) {
    return new CrispElement(el.name, el.description, el.page, el.selectors, el.pageObjectPattern, el.actionPatterns, el.parentElement, el._id, el.date);
  }
}
