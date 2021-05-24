import { StoreToStorageService } from './store-to-storage.service';

export interface Storages {
  [key: string]: StoreToStorageService<any>;
}

export class CommonStorageService {

  private _storages: Storages = {};

  /**
   * Creates new storage and returns the created one
   * @param key {string} Object key on storage work with entities
   * @param defaults {Array<E>} Default value of storage
  */
  public registerStorage<E>(key: string, constructorFn: (...args: any[]) => E, defaults: Array<E> = []): StoreToStorageService<E> {
    this._storages[key] = new StoreToStorageService<E>(key, constructorFn, defaults);
    return this._storages[key];
  }

  /**
   * Returns registered storage
   * @param key {string} Storage key
  */
  public getStorage<E>(key: string): StoreToStorageService<E> {
    return this._storages[key];
  }

  /**
   * Returns all registered storages
  */
  public get storages(): Storages {
    return this._storages;
  }

}

export const commonStorageService = new CommonStorageService();
