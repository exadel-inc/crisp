import { PermissionEntityWithId } from 'src/modules/permission/permission.entity';
import { PermissionTypeEnum, resources, ResourceTypeEnum } from '../../common/enums';
import { excludeResources } from '../helpers/resource.helper';
import { ResourceMongoService } from '../mongo-services';
import { PermissionMongoService } from '../mongo-services';

const resourceMongoService: ResourceMongoService = new ResourceMongoService();
const permissionMongoService: PermissionMongoService = new PermissionMongoService();

module.exports.up = async function () {
  const permissions: PermissionEntityWithId[] = await permissionMongoService.getPermissions();
  const userPermissions = permissions
    .filter((permission) => permission.name === PermissionTypeEnum.READ)
    .map((permission) => permission._id);

  const adminPermissions = permissions
    .filter((permission) =>
      [PermissionTypeEnum.READ, PermissionTypeEnum.WRITE].map(String).includes(permission.name),
    )
    .map((permission) => permission._id);

  const mapResourceWithPermissions = (permissions) =>
    resources.reduce((acc, value) => {
      return { ...acc, [value.name]: permissions };
    }, {});

  const setPermissionToResouce = (resources) =>
    Object.entries(resources).map(([name, permissions]) => ({
      name,
      permissions,
    }));

  const userResources = mapResourceWithPermissions(userPermissions);
  const adminResources = mapResourceWithPermissions(adminPermissions);

  const adminAccess = setPermissionToResouce(adminResources);
  const user = setPermissionToResouce(userResources);

  const userReadAccess = user.filter(
    excludeResources(ResourceTypeEnum.PAGE, ResourceTypeEnum.ELEMENT),
  );

  const userAccess = [...userReadAccess];

  await Promise.all(
    [userAccess, adminAccess].map(
      resourceMongoService.bulkInsertResources.bind(resourceMongoService),
    ),
  );
};

module.exports.down = async function () {};
