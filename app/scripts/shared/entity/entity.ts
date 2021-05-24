const bsonObjectid  = require('bson-objectid');

export class Entity {

  /**
   * Entity id
  */
  private _id: string;

  /**
   * Entity update or create date
  */
  protected date: Date;

  constructor(id?: string, date?: Date | string) {
    this.setId(id);
    this.setDate(date);
  }

  /**
   * Sets entity date
   * If no date provided, sets the current date.
   * @param date {Date | string} new date to be set.
  */
  public setDate(date?: Date | string): void {
    this.date = date ? new Date(date) : new Date();
  }

  /**
   * Entity id
  */
  public get id(): string {
    return this._id;
  }

  /**
   * Sets entity id
   * If no id provided, sets the new id.
   * @param id {string} new id to be set.
  */
  private setId(id?: string): void {
    this._id = id || bsonObjectid(id).str;
  }

  /**
   * Overriding standard object valueOf to have the possibility to compare and sort entities by date.
   * If no date is defined, then the Entity will be considered as an oldest one.
  */
  private valueOf(): number {
    return this.date ? this.date.getTime() : 0;
  }

}
