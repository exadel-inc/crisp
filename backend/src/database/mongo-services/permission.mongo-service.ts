import { CreatePermissionDto } from '../../modules/permission/dto';
import { PermissionService } from '../../modules/permission';
import {
  PermissionEntityWithId,
  PermissionModel,
} from '../../modules/permission/permission.entity';

export class PermissionMongoService {
  private readonly permissionService: PermissionService;

  constructor() {
    this.permissionService = new PermissionService(PermissionModel as any);
  }

  public getPermissions(): Promise<PermissionEntityWithId[]> {
    return this.permissionService.getPermissions();
  }

  public createPermission(payload: CreatePermissionDto): Promise<PermissionEntityWithId> {
    return this.permissionService.createPermission(payload);
  }

  public bulkInsertPermissions(
    permissions: CreatePermissionDto[],
  ): Promise<PermissionEntityWithId[]> {
    return this.permissionService.bulkInsertPermissions(permissions);
  }

  public bulkRemoveRermissions(field: string, values: string[]) {
    return this.permissionService.bulkRemoveRermissions(field, values);
  }
}
