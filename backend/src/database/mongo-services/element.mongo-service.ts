import { PatternDataService, PatternService } from '../../modules/pattern';
import { PatternDataModel } from '../../modules/pattern/pattern-data.entity ';
import { PatternModel } from '../../modules/pattern/pattern.entity';
import { SelectorService } from '../../modules/selector';
import { SelectorModel } from '../../modules/selector/selector.entity';
import { ElementService } from '../../modules/element';
import { CreateElementDto } from '../../modules/element/dto';
import {
  ElementEntity,
  ElementEntityWithId,
  ElementModel,
} from '../../modules/element/element.entity';

export class ElementMongoService {
  private readonly elementService: ElementService;

  constructor() {
    this.elementService = new ElementService(
      ElementModel as any,
      new SelectorService(SelectorModel as any),
      new PatternDataService(PatternDataModel as any, new PatternService(PatternModel as any)),
    );
  }

  public getElements(): Promise<ElementEntity[]> {
    return this.elementService.getElements();
  }

  public createElement(payload: CreateElementDto): Promise<ElementEntityWithId> {
    return this.elementService.createElement(payload);
  }

  public bulkInsertElements(Elements: CreateElementDto[]): Promise<ElementEntityWithId[]> {
    return this.elementService.bulkInsertElements(Elements);
  }

  public bulkRemoveElements(field: string, values: string[]) {
    return this.elementService.bulkRemoveElements(field, values);
  }

  public removeElement(field: string, value: string) {
    return this.elementService.removeElement(field, value);
  }
}
