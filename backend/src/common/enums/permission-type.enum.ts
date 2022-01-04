export enum PermissionTypeEnum {
  READ = 'READ',
  WRITE = 'WRITE',
}

export const permissions = Object.keys(PermissionTypeEnum).map((permission) => ({
  name: permission,
  description: `${permission} access description`,
}));
