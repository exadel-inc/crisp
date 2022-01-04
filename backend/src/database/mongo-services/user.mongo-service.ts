import { UserService } from '../../modules/user';
import { UserModel } from '../../modules/user/user.entity';

export class UserMongoService {
  private readonly userService: UserService;
  constructor() {
    this.userService = new UserService(UserModel as any);
  }

  public createUser(payload: any) {
    return this.userService.createUser(payload);
  }

  public bulkInsertUsers(users: any[]) {
    return this.userService.bulkInsertUsers(users);
  }
}
