import { permissions } from '../../common/enums';
import { PermissionMongoService } from '../mongo-services';

const permissionMongoService: PermissionMongoService = new PermissionMongoService();

module.exports.up = async function () {
  await permissionMongoService.bulkInsertPermissions(permissions);
};

module.exports.down = async function () {
  const [name] = Object.keys([...permissions].shift());
  await permissionMongoService.bulkRemoveRermissions(
    name.toString(),
    permissions.map((permission) => permission.name),
  );
};
