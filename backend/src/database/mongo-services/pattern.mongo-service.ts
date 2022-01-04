import { CreatePatternDto, PatternService } from '../../modules/pattern';
import {
  PatternEntity,
  PatternEntityWithId,
  PatternModel,
} from '../../modules/pattern/pattern.entity';

export class PatternMongoService {
  private readonly patternService: PatternService;

  constructor() {
    this.patternService = new PatternService(PatternModel as any);
  }

  public getPatterns(): Promise<PatternEntity[]> {
    return this.patternService.getPatterns();
  }

  public createPattern(payload: CreatePatternDto): Promise<PatternEntityWithId> {
    return this.patternService.createPattern(payload);
  }

  public bulkInsertPatterns(Patterns: CreatePatternDto[]): Promise<PatternEntityWithId[]> {
    return this.patternService.bulkInsertPatterns(Patterns);
  }

  public bulkRemovePatterns(field: string, values: string[]) {
    return this.patternService.bulkRemovePatterns(field, values);
  }

  public removePattern(field: string, value: string) {
    return this.patternService.removePattern(field, value);
  }

  public getPatternByName(name: string) {
    return this.patternService.getPatternByName(name);
  }
}
