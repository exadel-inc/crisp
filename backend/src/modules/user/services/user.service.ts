import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserEntity } from '../user.entity';
import { createError } from '../../../common/helpers/error-handling.helpers';
import { ErrorTypeEnum } from '../../../common/enums';
import { CreateUserDto, UpdateUserDto } from '../dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(UserEntity.name) private readonly userRepository: Model<UserEntity>) {}

  public async getUserByRefreshToken(
    currentHashedRefreshToken: string,
  ): Promise<UserEntity | null> {
    return this.userRepository.findOne({ currentHashedRefreshToken }).exec();
  }

  public async getUserEntityByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({ email }).exec();
  }

  public async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    return new this.userRepository(createUserDto).save();
  }

  public async getUsers(): Promise<UserEntity[]> {
    return this.userRepository.find().exec();
  }

  public async updateUserById(id: string, payload: UpdateUserDto): Promise<UserEntity> {
    return this.userRepository.findByIdAndUpdate(id, payload, { new: true }).exec();
  }

  public async deleteUserById(id: string): Promise<UserEntity> {
    return this.userRepository.findByIdAndRemove(id).exec();
  }

  public async getUserBy(options: any): Promise<UserEntity | null> {
    const user: UserEntity = await this.userRepository.findOne(options).exec();
    if (!user) {
      throw new NotFoundException(createError(ErrorTypeEnum.USER_NOT_FOUND, options));
    }
    return user;
  }

  public async getUserByEmail(email: string): Promise<UserEntity | null> {
    return this.getUserBy({ email });
  }

  public async getUserById(id: string): Promise<UserEntity | null> {
    return this.getUserBy({ _id: id });
  }

  public async removeRefreshToken(id: string): Promise<UserEntity> {
    return this.updateUserById(id, { currentHashedRefreshToken: null });
  }

  public async setCurrentRefreshTokenAndGetUser(
    id: string,
    refreshToken: string,
  ): Promise<UserEntity> {
    await this.updateUserById(id, { currentHashedRefreshToken: refreshToken });
    return this.getUserById(id);
  }

  public async getUserIfRefreshTokenMatches(
    currentHashedRefreshToken: string,
  ): Promise<UserEntity> {
    return this.getUserBy({ currentHashedRefreshToken });
  }
}
