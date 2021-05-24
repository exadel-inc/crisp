import { AddType, CommonService } from '../shared/common-service';
import { commonStorageService } from '../storage/common-storage-service';
import { Page } from './page';
import { StoreToStorageService } from '../storage/store-to-storage.service';
import clone from 'lodash/clone';
import { STANDARD_PAGES } from './standard-pages';

export class PagesService implements CommonService<Page> {

  private _storage: StoreToStorageService<Page>;

  constructor() {
    this._storage = commonStorageService.registerStorage<Page>('pages', this._constructorFn, STANDARD_PAGES);
  }

  /**
   * Returns all pages of current project.
   * If project is omitted, returns all pages.
   * @param project {string} Page project.
  */
  public getMany(project?: string): Page[] {
    return this._storagePages.filter(pr => this._isOfSameQuery(pr, project));
  }

  /**
   * Returns first page that match all criterias.
   * If any of parameters is omitted, takes the first page taken from all kinds of this parameter.
   * @param name {string} Page name.
   * @param project {string} Page project.
  */
  public find(name: string, project?: string): Page | undefined {
    return this._storagePages.find(pr => this._isSamePage(pr, name, project));
  }

  /**
   * Returns first page that has same id.
   * @param name {id} Page id.
  */
  public findById(id: string): Page | undefined {
    return this._storagePages.find((pg: Page) => pg.id === id);
  }

  /**
   * Returns the index of the page that has same id.
   * Returns -1 if no page found
   * @param id {string} Page id.
  */
  public getIndex(id: string): number {
    return this._storagePages.findIndex((pg: Page) => pg.id === id);
  }

  /**
   * Saves page to storage.
   * If page with same id exists, logs error in console and doesn't save.
   * @param page {Page} Page to save.
   * @param index {number} The index at which the new page should be inserted in the list. Default is 0
  */
  public add(page: Page, index: number = 0): void {
    if (this.findById(page.id)) {
      throw new Error('Unable to save. Page already exist');
    } else {
      // a case when entity data doesn't have methods
      page.setDate && page.setDate();
      const pages: Page[] = this._storagePages;
      pages.splice(index, 0, page);
      this._storage.write(pages);
    }
  }

  /**
   * Saves pages to storage.
   * @param pages {Page[]} Pages to save.
   * @param addType {AddType} Possible conflicts resolving logic:
   * FORCE_OVERRIDE - add new records and delete old ones
   * OVERWRITE_OLDER - owerwrite based on date
   * SKIP_EXISTING - do not replace existing records
  */
  public addMany(pages: Page[], addType = AddType.FORCE_OVERRIDE): void {
    // a case when entity data doesn't have methods
    pages.forEach((page: Page) => {
      page.setDate && page.setDate();
    });
    switch (addType) {
      case AddType.FORCE_OVERRIDE: {
        this._storage.write(pages);
        break;
      }
      case AddType.OVERWRITE_OLDER: {
        const newPages = this._storagePages;
        pages.forEach((page: Page) => {
          const samePage = newPages.find((pg: Page) => pg.id === page.id);
          if (samePage) {
            if (page > samePage) {
              const samePageIdx = newPages.indexOf(samePage);
              newPages[samePageIdx] = page;
            }
          } else {
            newPages.splice(0, 0, page);
          }
        });
        this._storage.write(newPages);
        break;
      }
      case AddType.SKIP_EXISTING: {
        const newPages = this._storagePages;
        pages.forEach((page: Page) => {
          const samePage = newPages.find((pg: Page) => pg.id === page.id);
          if (!samePage) {
            newPages.splice(0, 0, page);
          }
        });
        this._storage.write(newPages);
        break;
      }
      default: break;
    }
  }


  /**
   * Deletes page from storage.
   * If page doesn't exist, logs error in console and doesn't remove.
   * @param id {string} Page id.
  */
  public remove(id: string): void {
    if (!this.findById(id)) {
      throw new Error('Unable to remove. Page doesn`t exist');
    } else {
      const pages: Page[] = this._storagePages.filter(pg => pg.id !== id);
      this._storage.write(pages);
    }
  }

  /**
   * Updates page with provided id.
   * @param id {string} page id.
   * @param dataToUpdate {Partial<Page>} Data to be updated in old page to create new one.
  */
  public update(id: string, dataToUpdate: Partial<Page>): void {
    if (!this.findById(id)) {
      throw new Error('Unable to update. Page doesn`t exist');
    } else {
      const pages: Page[] = this._storagePages.map(pg => pg.id === id ? {...pg, ...dataToUpdate} as Page : pg);
      this._storage.write(pages);
    }
  }

  /**
   * Deletes all pages from storage
  */
  public removeAll(): void {
    this._storage.write([]);
  }

  /**
   * Clones the page (only the object itself without dependencies)
   * @param page {Page} page.
  */
  public clone(page: Page): Page {
    return this._constructorFn(clone(page));
  }

  /**
   * Checks if current item is a valid Page (using duck typing)
   * @param item {unknown} an item for check
  */
  public isValid(item: unknown): boolean {
    if (item && typeof item === 'object') {
      const validPropNames = ['name', 'project'];
      return validPropNames.every(propName => Object.keys(item).includes(propName));
    }
    return false;
  }

  private _isOfSameQuery(pg: Page, project?: string): boolean {
    return ((pg.project === project) || !project);
  }

  private _isSamePage(pg: Page, name: string, project?: string): boolean {
    return (pg.name === name) && this._isOfSameQuery(pg, project);
  }

  /**
   * Pages that are stored in storage.
  */
  private get _storagePages(): Page[] {
    return this._storage.read();
  }

  /**
   * Page constructor.
  */
  private _constructorFn(pg: any) {
    return new Page(pg.name, pg.project, pg.description, pg._id, pg.date);
  }
}
