import { Entity } from '../shared/entity/entity';
import { ElementSelectors, ElementPatternData } from './element-selectors-interface';

export class CrispElement extends Entity {

  /**
   * Element name
  */
  public name: string;

  /**
   * Element description
  */
  public description: string;

  /**
   * Page linked to element
  */
  public page: string;

  /**
   * Element selectors
  */
  public selectors: ElementSelectors;

  /**
   * Page object pattern linked to element
  */
  public pageObjectPattern: ElementPatternData | null;

  /**
   * Action patterns linked to element
  */
  public actionPatterns: ElementPatternData[];

  /**
   * Parent element
  */
  public parentElement?: string;

  /**
   * Creates new element object
  */
  constructor(
    name: string,
    description: string,
    page: string,
    selectors: ElementSelectors = {},
    pageObjectPattern: ElementPatternData | null = null,
    actionPatterns: ElementPatternData[] = [],
    parentElement: string = '',
    id?: string,
    date?: Date | string,
  ) {
    super(id, date);
    this.name = name;
    this.description = description;
    this.page = page;
    this.selectors = selectors;
    this.pageObjectPattern = pageObjectPattern;
    this.actionPatterns = actionPatterns;
    this.parentElement = parentElement;
  }

}
