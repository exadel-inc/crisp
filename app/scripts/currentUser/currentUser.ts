import { Entity } from '../shared/entity/entity';

export class UserRole {
  public id: string;
  public name: string;
  constructor(id: string = '', name: string = 'USER') {
    this.id = id;
    this.name = name;
  }
}

export class CurrentUser extends Entity {

  /**
   * User name
  */
  public name: string;

  /**
   * User email
  */
  public email: string;

  /**
   * User current token
  */
  public token: string;

  /**
   * User refresh token
  */
  public refreshToken: string;

  /**
   * User token expiration date
  */
  public expirationDate: string;

  /**
   * User role
  */
  public role: UserRole;

  /**
   * db host
  */
  public host: string;

  /**
   * Creates new Project object
  */
  constructor(
    id?: string,
    name: string = '',
    email: string = '',
    token: string = '',
    refreshToken: string = '',
    expirationDate: string = '',
    role: UserRole = new UserRole(),
    host: string = ''
  ) {
    super(id);
    this.name = name;
    this.email = email;
    this.token = token;
    this.refreshToken = refreshToken;
    this.expirationDate = expirationDate;
    this.role = role;
    this.host = host;
  }
}
