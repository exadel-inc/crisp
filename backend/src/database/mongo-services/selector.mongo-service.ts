import { CreateSelectorDto } from '../../modules/selector/dto';
import {
  SelectorEntity,
  SelectorEntityWithId,
  SelectorModel,
} from '../../modules/selector/selector.entity';
import { SelectorService } from '../../modules/selector';

export class SelectorMongoService {
  private readonly selectorService: SelectorService;

  constructor() {
    this.selectorService = new SelectorService(SelectorModel as any);
  }

  public getSelectors(): Promise<SelectorEntity[]> {
    return this.selectorService.getSelectors();
  }

  public createSelector(payload: CreateSelectorDto): Promise<SelectorEntityWithId> {
    return this.selectorService.createSelector(payload);
  }

  public bulkInsertSelectors(Selectors: CreateSelectorDto[]): Promise<SelectorEntityWithId[]> {
    return this.selectorService.bulkInsertSelectors(Selectors);
  }

  public bulkRemoveSelectors(field: string, values: string[]) {
    return this.selectorService.bulkRemoveSelectors(field, values);
  }

  public removeSelector(field: string, value: string) {
    return this.selectorService.removeSelector(field, value);
  }
}
