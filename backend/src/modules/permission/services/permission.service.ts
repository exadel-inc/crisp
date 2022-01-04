import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePermissionDto } from '../dto';
import { PermissionEntity, PermissionEntityWithId } from '../permission.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectModel(PermissionEntity.name)
    private readonly permissionRepository: Model<PermissionEntity>,
  ) {}

  public createPermission(
    createPermissionDto: CreatePermissionDto,
  ): Promise<PermissionEntityWithId> {
    return new this.permissionRepository(createPermissionDto).save();
  }

  public bulkInsertPermissions(
    createPermissionDto: CreatePermissionDto[],
  ): Promise<PermissionEntityWithId[]> {
    return this.permissionRepository.insertMany(createPermissionDto).catch((err) => {
      throw err;
    });
  }

  public bulkRemoveRermissions(field: string, values: string[]) {
    return this.permissionRepository.remove({ [field]: { $in: values } });
  }

  public async getPermissions(): Promise<PermissionEntityWithId[]> {
    return this.permissionRepository.find().exec();
  }
}
