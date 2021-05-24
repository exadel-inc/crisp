import { CommonStorage } from './storage';

export class LocalStorageService<E> implements CommonStorage<E> {

  /**
   * Object key on storage to save entities
  */
  protected _key: string;

  /**
   * Default value of storage
  */
  protected _defaultRecords: Array<E>;

  /**
   * Entity constructor
  */
  protected constructorFn: (...args: any[]) => E;

  constructor(key: string, constructorFn: (...args: any[]) => E, defaultRecords: Array<E> = []) {
    this._key = key;
    this._defaultRecords = defaultRecords;
    this.constructorFn = constructorFn;
    this._prepareStorage();
  }

  /**
   * Reads data from localStorage
  */
  public read(): Array<E> {
    const entitiesInStorage: string | null = localStorage.getItem(this._key);
    // entities are saved as string in localStorage, so we parse and then convert them in entities[] type
    return entitiesInStorage ? JSON.parse(entitiesInStorage).map(this.constructorFn) : [];
  };

  /**
   * Writes data to localStorage
  */
  public write(data: Array<E>): void {
    localStorage.setItem(this._key, JSON.stringify(data));
  };

  /**
   * Loads default entities to localStorage
  */
  public loadDefaults(): void {
    this.write(this._defaultRecords);
  }

  /**
   * If no entities in storage, loads defaults
  */
  private _prepareStorage(): void {
    if (!localStorage.getItem(this._key)) {
      this.loadDefaults();
    }
  }

}
