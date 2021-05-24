export declare class CommonStorage<E> {

  /**
   * Reads data from storage
  */
  public read(): Array<E>;

  /**
   * Writes data to storage
   * @param data {E} data to be saved
  */
  public write(data: Array<E>): void;

}
