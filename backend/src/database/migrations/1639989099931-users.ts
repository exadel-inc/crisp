import { RoleTypeEnum } from '../../common/enums';
import { RoleMongoService, UserMongoService } from '../mongo-services';
import { BcryptHashService } from '../../common/services/bcrypt-hash.service';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '../../config';

const userMongoService: UserMongoService = new UserMongoService();
const roleMongoService: RoleMongoService = new RoleMongoService();
const bcryptHashService: BcryptHashService = new BcryptHashService();
const configService: ConfigService = new ConfigService();

const jwtService: JwtService = new JwtService({
  secret: configService.get('JWT_ACCESS_TOKEN_SECRET'),
  signOptions: {
    expiresIn: configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
  },
});

module.exports.up = async function () {
  const adminRole = await roleMongoService.getRoleByName(String(RoleTypeEnum.ADMIN));
  const hashedPassword: string = await bcryptHashService.hashPassword(uuidv4());
  const email = `${String(RoleTypeEnum.ADMIN).toLowerCase()}@gmail.com`;
  const token: string = jwtService.sign({ email });

  await userMongoService.createUser({
    username: RoleTypeEnum.ADMIN,
    email,
    password: hashedPassword,
    currentHashedRefreshToken: token,
    roles: [adminRole._id],
    projects: [],
    grants: [],
  });
};

module.exports.down = async function () {};
