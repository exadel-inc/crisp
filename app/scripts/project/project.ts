import { Entity } from '../shared/entity/entity';

export class Project extends Entity {

  /**
   * Project name
  */
  public name: string;

  /**
   * Fremework name
  */
  public framework: string;

  /**
   * Project description
  */
  public description?: string;

  /**
   * Project is default flag
  */
  public isDefault?: boolean;

  /**
   * Creates new Project object
  */
  constructor(
    name: string,
    framework: string,
    description: string = '',
    isDefault: boolean = false,
    id?: string,
    date?: Date | string,
  ) {
    super(id, date);
    this.name = name;
    this.framework = framework;
    this.description = description;
    this.isDefault = isDefault;
  }

}
