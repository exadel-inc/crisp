import {
  ResourceEntity,
  ResourceEntityWithId,
  ResourceModel,
} from '../../modules/resource/resource.entity';
import { CreateResourceDto, ResourceService } from '../../modules/resource';

export class ResourceMongoService {
  private readonly resourceService: ResourceService;
  constructor() {
    this.resourceService = new ResourceService(ResourceModel as any);
  }

  public createResource(payload: CreateResourceDto): Promise<ResourceEntityWithId> {
    return this.resourceService.createResource(payload);
  }

  public bulkInsertResources(resources: CreateResourceDto[]): Promise<ResourceEntityWithId[]> {
    return this.resourceService.bulkInsertResources(resources);
  }

  public bulkRemoveResources(field: string, values: string[]) {
    return this.resourceService.bulkRemoveResources(field, values);
  }

  public getResources(): Promise<ResourceEntity[]> {
    return this.resourceService.getResources();
  }
}
