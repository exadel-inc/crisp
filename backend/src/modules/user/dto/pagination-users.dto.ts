import { PaginationMixin } from 'src/common/dto';

import { UserEntity } from '../user.entity';

export class PaginationUsersDto extends PaginationMixin(UserEntity) {
  constructor([result, total]: [UserEntity[], number]) {
    super();
    Object.assign(this, { result, total });
  }
}
