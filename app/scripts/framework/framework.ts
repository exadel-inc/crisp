import { Entity } from '../shared/entity/entity';

export class Framework extends Entity {

  /**
   * Framework name
  */
  public name: string;

  /**
   * Framework description
  */
  public description?: string;

  /**
   * Creates new Framework object
  */
  constructor(
    name: string,
    description: string = '',
    id?: string,
    date?: Date | string,
  ) {
    super(id, date);
    this.name = name;
    this.description = description;
  }

}
