import { PermissionTypeEnum, ResourceTypeEnum } from '../enums';
import { CanActivate, ExecutionContext, Inject, mixin, Type } from '@nestjs/common';
import { RoleService } from '../../modules/role';
import { RoleEntity, RoleEntityWithId } from '../../modules/role/role.entity';
import { ResourceEntity } from '../../modules/resource/resource.entity';
import { PermissionEntity } from '../../modules/permission/permission.entity';
import { UserEntity } from 'src/modules/user/user.entity';

export const PermissionGuard = (
  permissionName: PermissionTypeEnum,
  resourceName: ResourceTypeEnum,
): Type<CanActivate> => {
  class PermissionGuardMixin implements CanActivate {
    constructor(@Inject('RoleService') private readonly roleService: RoleService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const getResourceCb = (resourceName: string) => (resource: ResourceEntity) =>
        resource.name === resourceName;

      const getPermissionCb = (permissionName: string) => (permission: PermissionEntity) =>
        permission.name === permissionName;

      const getRoleById = (role: RoleEntityWithId) =>
        this.roleService.getRoleById(String(role._id));

      const request = context.switchToHttp().getRequest();
      const user = request.user;

      const roles = await Promise.all(user.roles.map(getRoleById));

      const resource = roles
        .map((role: RoleEntity) => role.resources)
        .pop()
        .filter(getResourceCb(resourceName))
        .pop();

      const includeGrants = (user: UserEntity, name: string) => user.grants.includes(name);
      return (
        resource.permissions.some(getPermissionCb(permissionName)) ||
        includeGrants(user, permissionName)
      );
    }
  }

  return mixin(PermissionGuardMixin);
};
