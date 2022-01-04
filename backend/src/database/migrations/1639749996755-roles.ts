import { RoleTypeEnum, roles, PermissionTypeEnum, ResourceTypeEnum } from '../../common/enums';
import { selectSpecificResources } from '../helpers/resource.helper';
import { ResourceMongoService } from '../mongo-services';
import { RoleMongoService } from '../mongo-services/role.mongo-service';

const resourceMongoService: ResourceMongoService = new ResourceMongoService();
const roleMongoService: RoleMongoService = new RoleMongoService();

module.exports.up = async function () {
  const resources = await resourceMongoService.getResources();
  const resourceSeparation = resources.reduce(
    (acc, resource) => {
      const permissions: string[] = resource.permissions.map((permission) => permission.name);
      const isAdmin: (string) => boolean = (permission: string) => permissions.includes(permission);

      const resourceHandlers: Record<string, string> = {
        true: 'admin',
        false: 'user',
      };

      const key: boolean = [PermissionTypeEnum.READ, PermissionTypeEnum.WRITE]
        .map(String)
        .every(isAdmin);

      acc[resourceHandlers[key as any]].push(resource);

      return acc;
    },
    {
      admin: [],
      user: [],
    },
  );

  const mapIds = (resources) => resources.map((resource) => resource._id);
  const filterRolesByType = (type) => roles.filter((role) => role.name === type);

  const setRolesToResources = (roles, resources) =>
    roles
      .map(({ name, description }) => {
        return { name, description, resources };
      })
      .shift();

  const userWriteResources = [...resourceSeparation.admin].filter(
    selectSpecificResources(ResourceTypeEnum.PAGE, ResourceTypeEnum.ELEMENT),
  );

  const userAccess = [...userWriteResources, ...resourceSeparation.user];

  const user = mapIds(userAccess);
  const admin = mapIds(resourceSeparation.admin);

  const userRoles = filterRolesByType(RoleTypeEnum.USER);
  const adminRoles = filterRolesByType(RoleTypeEnum.ADMIN);

  await Promise.all(
    [setRolesToResources(userRoles, user), setRolesToResources(adminRoles, admin)].map(
      roleMongoService.bulkInsertRoles.bind(roleMongoService),
    ),
  );
};

module.exports.down = async function () {};
