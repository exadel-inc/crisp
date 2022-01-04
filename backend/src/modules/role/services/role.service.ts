import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { populateRelation } from 'src/common/helpers';
import { PermissionEntity } from 'src/modules/permission/permission.entity';
import { ResourceEntity } from 'src/modules/resource/resource.entity';
import { CreateRoleDto } from '../dto';
import { RoleEntity, RoleEntityWithId } from '../role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(RoleEntity.name)
    private readonly roleRepository: Model<RoleEntity>,
  ) {}

  public async createRole(createResourceDto: CreateRoleDto): Promise<RoleEntityWithId> {
    return new this.roleRepository(createResourceDto).save();
  }

  public bulkInsertRoles(createResourceDto: CreateRoleDto[]): Promise<RoleEntityWithId[]> {
    return this.roleRepository.insertMany(createResourceDto).catch((err) => {
      throw err;
    });
  }

  public bulkRemoveRoles(field: string, values: string[]) {
    return this.roleRepository.remove({ [field]: { $in: values } });
  }

  public async getRoles(): Promise<RoleEntityWithId[]> {
    return this.roleRepository.find().exec();
  }

  public getRoleByName(field: string) {
    return this.roleRepository.findOne({ name: field }).exec();
  }

  public getRoleById(id: string) {
    const resource = populateRelation('resources', ResourceEntity.name);
    const permission = populateRelation('permissions', PermissionEntity.name);

    return this.roleRepository
      .findOne({ _id: id })
      .populate({
        ...resource,
        populate: {
          ...permission,
        },
      })
      .exec();
  }
}
