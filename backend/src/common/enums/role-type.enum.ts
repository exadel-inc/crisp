export enum RoleTypeEnum {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export const roles = Object.keys(RoleTypeEnum).map((role) => ({
  name: role,
  description: `${role} role description`,
}));
