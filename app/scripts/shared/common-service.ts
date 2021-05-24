export enum AddType {
  FORCE_OVERRIDE = 'OVERRIDE',
  OVERWRITE_OLDER = 'OVERWRITE_OLDER',
  SKIP_EXISTING = 'SKIP_EXISTING',
}

export declare class CommonService<E> {
  public getMany(...args: any): Array<E>;
  public find(name: string, ...args: any): E | undefined;
  public findById(id: string): E | undefined;
  public getIndex(id: string): number;
  public update(id: string, newItem: Partial<E>): void;
  public remove(id: string): void;
  public removeAll(): void;
  public add(item: E, index?: number): void;
  public addMany(items: Array<E>, addType?: AddType, ...args: any): void;
  public isValid(item: unknown): boolean;
  public clone(item: E): E;
}
