import { PermissionEntityWithId } from '../../modules/permission/permission.entity';

type Resource = {
  readonly name: string;
  readonly permissions: PermissionEntityWithId[];
};

export const selectSpecificResources =
  (...names: string[]) =>
  (resource: Resource): boolean =>
    names.map(String).includes(resource.name);

export const excludeResources =
  (...names: string[]) =>
  (resource: Resource): boolean =>
    !names.includes(resource.name);
