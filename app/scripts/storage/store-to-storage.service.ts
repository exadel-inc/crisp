import { WriteToStorageAction } from '../redux/reducers/storage/storage.actions';
import { StorageState } from '../redux/reducers/storage/storage.reducer';
import store from '../redux/store';
import { LocalStorageService } from './local-storage-service';
import { CommonStorage } from './storage';

export class StoreToStorageService<E> extends LocalStorageService<E> implements CommonStorage<E> {

  constructor(key: string, constructorFn: (...args: any[]) => E, defaultRecords: Array<E> = []) {
    super(key, constructorFn, defaultRecords);
    this._syncStoreWithLocalStorage();
  }

  /**
   * Reads data from redux store
  */
  public read(): Array<E> {
    return store.getState().storage[this._key as keyof StorageState] as unknown as E[];
  };

  /**
   * Writes data to localStorage and to the redux store
  */
  public write(data: Array<E>): void {
    super.write(data);
    this._syncStoreWithLocalStorage();
  };

  /**
   * Loads default entities to localStorage and to the redux store
  */
  public loadDefaults(): void {
    super.loadDefaults();
    this._syncStoreWithLocalStorage();
  }

  /**
   * Loads data from localStorage to redux store
  */
  private _syncStoreWithLocalStorage() {
    store.dispatch({...new WriteToStorageAction({key: this._key, data: super.read()})});
  }

}
