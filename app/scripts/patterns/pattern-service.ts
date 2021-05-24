import { PatternType } from './pattern-interface';
import { STANDARD_PATTERNS } from './standard-patterns';
import { Pattern } from './pattern';
import { AddType, CommonService } from '../shared/common-service';
import { commonStorageService } from '../storage/common-storage-service';
import { StoreToStorageService } from '../storage/store-to-storage.service';
import clone from 'lodash/clone';

export class PatternService implements CommonService<Pattern> {

  private _storage: StoreToStorageService<Pattern>;

  constructor() {
    this._storage = commonStorageService.registerStorage<Pattern>('patterns', this._constructorFn, STANDARD_PATTERNS);
  }

  /**
   * Returns all patterns of current type (if defined) and framework (if defined).
   * If any of parameters is omitted, returns patterns with all kinds of this parameter.
   * @param type {PatternType} Pattern type (object or action pattern).
   * @param frameworkId {string} Framework id, in which language script is being generated.
  */
  public getMany(type?: PatternType, frameworkId?: string): Pattern[] {
    return this._storagePatterns.filter(pt => this._isOfSameQuery(pt, type, frameworkId));
  }

  /**
   * Returns first pattern that match all criterias.
   * If any of parameters is omitted, takes the first pattern taken from all kinds of this parameter.
   * @param name {string} Pattern name or short info.
   * @param type {PatternType} Pattern type (object or action pattern).
   * @param frameworkName {string} Framework name, in which language script is being generated (ex: Cucumber).
  */
  public find(name: string, type?: PatternType, frameworkName?: string): Pattern | undefined {
    return this._storagePatterns.find(pt => this._isSamePattern(pt, name, type, frameworkName));
  }

  /**
   * Returns first pattern that has same id.
   * @param name {id} Pattern id.
  */
  public findById(id: string): Pattern | undefined {
    return this._storagePatterns.find((pt: Pattern) => pt.id === id);
  }

  /**
   * Returns the index of the pattern that has same id.
   * Returns -1 if no pattern found
   * @param id {string} Pattern id.
  */
  public getIndex(id: string): number {
    return this._storagePatterns.findIndex((pt: Pattern) => pt.id === id);
  }

  /**
   * Saves pattern to storage.
   * If pattern with same id exists, logs error in console and doesn't save.
   * @param pattern {Pattern} Pattern to save.
   * @param index {number} The index at which the new pattern should be inserted in the list. Default is 0
  */
  public add(pattern: Pattern, index: number = 0): void {
    if (this.findById(pattern.id)) {
      throw new Error('Unable to save. Pattern already exist');
    } else {
      // a case when entity data doesn't have methods
      pattern.setDate && pattern.setDate();
      const patterns: Pattern[] = this._storagePatterns;
      patterns.splice(index, 0, pattern);
      this._storage.write(patterns);
    }
  }

  /**
   * Saves pages to storage.
   * @param patterns {Pattern[]} Patterns to save.
   * @param addType {AddType} Possible conflicts resolving logic:
   * FORCE_OVERRIDE - add new records and delete old ones
   * OVERWRITE_OLDER - owerwrite based on date
   * SKIP_EXISTING - do not replace existing records
   * @param useType {PatternType} enables to overwrite entities on one type only
  */
  public addMany(patterns: Pattern[], addType = AddType.FORCE_OVERRIDE, useType?: PatternType): void {
    // a case when entity data doesn't have methods
    patterns.forEach((pattern: Pattern) => {
      pattern.setDate && pattern.setDate();
    });
    switch (addType) {
      case AddType.FORCE_OVERRIDE: {
        if (!useType) {
          this._storage.write(patterns);
        } else { // WARNING: we expect here patterns of only one type
          const type: PatternType = useType;
          const allOtherPatterns = this._storagePatterns.filter(pt => pt.type !== type);
          this._storage.write([...patterns, ...allOtherPatterns]);
        }
        break;
      }
      case AddType.OVERWRITE_OLDER: {
        const newPatterns = this._storagePatterns;
        patterns.forEach((pattern: Pattern) => {
          const samePattern = newPatterns.find((pt: Pattern) => pt.id === pattern.id);
          if (samePattern) {
            if (pattern > samePattern) {
              const samePatternIdx = newPatterns.indexOf(samePattern);
              newPatterns[samePatternIdx] = pattern;
            }
          } else {
            newPatterns.splice(0, 0, pattern);
          }
        });
        this._storage.write(newPatterns);
        break;
      }
      case AddType.SKIP_EXISTING: {
        const newPatterns = this._storagePatterns;
        patterns.forEach((pattern: Pattern) => {
          const samePattern = newPatterns.find((pt: Pattern) => pt.id === pattern.id);
          if (!samePattern) {
            newPatterns.splice(0, 0, pattern);
          }
        });
        this._storage.write(newPatterns);
        break;
      }
      default: break;
    }
  }

  /**
   * Deletes pattern from storage.
   * If pattern doesn't exist, logs error in console and doesn't remove.
   * @param id {string} Pattern id.
  */
  public remove(id: string): void {
    if (!this.findById(id)) {
      throw new Error('Unable to remove. Pattern doesn`t exist');
    } else {
      const patterns: Pattern[] = this._storagePatterns.filter(pt => pt.id !== id);
      this._storage.write(patterns);
    }
  }

  /**
   * Updates pattern with provided id.
   * @param id {string} pattern id.
   * @param dataToUpdate {Partial<CrispElement>} Data to be updated in old element to create new one.
  */
  public update(id: string, dataToUpdate: Partial<Pattern>): void {
    if (!this.findById(id)) {
      throw new Error('Unable to update. Pattern doesn`t exist');
    } else {
      const patterns: Pattern[] = this._storagePatterns.map(pt => pt.id === id ? {...pt, ...dataToUpdate} as Pattern : pt);
      this._storage.write(patterns);
    }
  }

  /**
   * Deletes all patterns from storage
  */
  public removeAll(): void {
    this._storage.write([]);
  }

  /**
   * Clones the pattern (only the object itself without dependencies)
   * @param pattern {Pattern} pattern.
  */
  public clone(pattern: Pattern): Pattern {
    return this._constructorFn(clone(pattern));
  }

  /**
   * Loads default patterns to storage
   * @param patternType {PatternType} Pattern type. If provided, then load default patterns only of this type
   * If no patternType provided, loads default patterns of all types.
  */
  public loadDefaults(patternType?: PatternType): void {
    if (patternType) {
      const patternsForUpdate = STANDARD_PATTERNS.filter(pt => this._isOfSameQuery(pt, patternType));
      const otherPatterns = this._storagePatterns.filter(pt => !this._isOfSameQuery(pt, patternType));
      this._storage.write([...otherPatterns, ...patternsForUpdate]);
    } else {
      this._storage.loadDefaults();
    }
  }

  /**
   * Checks if current item is a valid Pattern (using duck typing)
   * @param item {unknown} an item for check
  */
  public isValid(item: unknown): boolean {
    if (item && typeof item === 'object') {
      const validPropNames = ['name', 'type', 'framework', 'script'];
      return validPropNames.every(propName => Object.keys(item).includes(propName));
    }
    return false;
  }

  private _isOfSameQuery(pt: Pattern, type?: PatternType, framework?: string): boolean {
    return ((pt.type === type) || !type) && ((pt.framework === framework) || !framework);
  }

  private _isSamePattern(pt: Pattern, name: string, type?: PatternType, framework?: string): boolean {
    return (pt.name === name) && this._isOfSameQuery(pt, type, framework);
  }

  /**
   * Patterns that are stored in storage.
  */
  private get _storagePatterns(): Pattern[] {
    return this._storage.read();
  }

  /**
   * Pattern constructor.
  */
  private _constructorFn(pt: any) {
    return new Pattern(pt.type, pt.framework, pt.name, pt.script, pt._id, pt.date);
  }

}
