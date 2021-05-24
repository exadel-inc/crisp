import { PatternType, ScriptArguments } from './pattern-interface';
import { STANDARD_VAR_NAMES } from '../shared/standard-var-names';
import { Entity } from '../shared/entity/entity';

export class Pattern extends Entity {

  /**
   * Pattern type (object or action pattern)
  */
  public type: PatternType;
  /**
   * Framework name, in which language script is being generated (ex: Cucumber)
  */
  public framework: string;
  /**
   * Pattern name or short info
  */
  public name: string;
  /**
   * Pattern script string
  */
  public script: string;

  /**
   * Creates new pattern object
   * @param type {PatternType} Pattern type (object or action pattern)
   * @param frameworkName {string} Framework name, in which language script is being generated (ex: Cucumber)
   * @param name {string} Pattern name or short info
   * @param script {string} script string ex: 'get ${customElementName}() { return "${elementId}" }'
  */
  constructor(
    type: PatternType,
    frameworkName: string,
    name: string,
    script: string,
    id?: string,
    date?: Date | string,
  ) {
    super(id, date);
    this.type = type;
    this.framework = frameworkName;
    this.name = name;
    this.script = script;
  }

  /**
   * Returns the generic pattern script string
   * @param args {ScriptArguments} an object with corresponding fields
   * @example
   * const myPattern = new Pattern(
   *  PatternType.PAGE_OBJECT,
   *  CUCUMBER,
   *  'getElementById',
   *  'get ${customElementName}() { return "${elementId}" }'
   * )
   * myPattern.getScript({
   *  customElementName: 'myElement',
   *  elementId: 'custom-id-001',
   * }) // => 'get myElement() { return "custom-id-001" }'
  */
  public getScript(args: ScriptArguments = {}): string {
    return Object.entries(args).reduce((scr: string, val) => {
      return scr.replace(new RegExp(('\\${' + val[0] + '\\}'), 'gi'), val[1]);
    }, this.script);
  }

  /**
   * Returns unique variable names that are inside the script
   * @param customOnly {boolean} if true returns only non-standard variable names
   * @example
   * const myPattern = new Pattern(
   *  PatternType.PAGE_OBJECT,
   *  CUCUMBER,
   *  'getElementById',
   *  'get ${customElementName}() { return "${elementId}" }'
   * )
   * myPattern.getVarNames()
   * // => ['customElementName', 'elementId']
  */
  public getVarNames(customOnly: boolean = false): string[] {
    const matches = this.script.match(/(?<=\${).*?(?=\})/gim) || [];
    return matches
      .filter((val: string) => customOnly ? !Object.values(STANDARD_VAR_NAMES as any).includes(val) : true)
      .reduce((acc: string[], val: string) => {
        if (val && !acc.includes(val)) {
          acc.push(val);
        }
        return acc;
      }, []);
  }

}
