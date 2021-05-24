import { Entity } from '../shared/entity/entity';

export class Page extends Entity {

  /**
   * Page name
  */
  public name: string;

  /**
   * Page project
  */
  public project: string;

  /**
   * Page description
  */
  public description?: string;

  /**
   * Creates new Page object
  */
  constructor(
    name: string,
    project: string,
    description: string = '',
    id?: string,
    date?: Date | string,
  ) {
    super(id, date);
    this.name = name;
    this.project = project;
    this.description = description;
  }

}
