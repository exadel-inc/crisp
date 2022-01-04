import { RoleEntityWithId, RoleModel } from '../../modules/role/role.entity';
import { CreateRoleDto, RoleService } from '../../modules/role';

export class RoleMongoService {
  private readonly roleService: RoleService;
  constructor() {
    this.roleService = new RoleService(RoleModel as any);
  }

  public createRole(payload: CreateRoleDto): Promise<RoleEntityWithId> {
    return this.roleService.createRole(payload);
  }

  public bulkInsertRoles(resources: CreateRoleDto[]): Promise<RoleEntityWithId[]> {
    return this.roleService.bulkInsertRoles(resources);
  }

  public bulkRemoveRoles(field: string, values: string[]) {
    return this.roleService.bulkRemoveRoles(field, values);
  }

  public getRoleByName(field: string) {
    return this.roleService.getRoleByName(field);
  }
}
