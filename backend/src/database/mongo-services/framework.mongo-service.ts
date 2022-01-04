import { CreateFrameworkDto } from '../../modules/framework/dto';
import {
  FrameworkEntity,
  FrameworkEntityWithId,
  FrameworkModel,
} from '../../modules/framework/framework.entity';
import { FrameworkService } from '../../modules/framework';

export class FrameworkMongoService {
  private readonly frameworkService: FrameworkService;

  constructor() {
    this.frameworkService = new FrameworkService(FrameworkModel as any);
  }

  public getFrameworks(): Promise<FrameworkEntity[]> {
    return this.frameworkService.getFrameworks();
  }

  public createFramework(payload: CreateFrameworkDto): Promise<FrameworkEntityWithId> {
    return this.frameworkService.createFramework(payload);
  }

  public bulkInsertFrameworks(Frameworks: CreateFrameworkDto[]): Promise<FrameworkEntityWithId[]> {
    return this.frameworkService.bulkInsertFrameworks(Frameworks);
  }

  public bulkRemoveFrameworks(field: string, values: string[]) {
    return this.frameworkService.bulkRemoveFrameworks(field, values);
  }

  public removeFramework(field: string, value: string) {
    return this.frameworkService.removeFramework(field, value);
  }

  public async getFrameworkByName(name: string): Promise<FrameworkEntityWithId | null> {
    return this.frameworkService.getFrameworkBy({ name });
  }
}
