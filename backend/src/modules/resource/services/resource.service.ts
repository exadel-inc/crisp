import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ErrorTypeEnum } from '../../../common/enums';
import { createError } from '../../../common/helpers';
import { PermissionEntity } from '../../../modules/permission/permission.entity';
import { CreateResourceDto, UpdateResourceDto } from '../dto';
import { ResourceEntity, ResourceEntityWithId } from '../resource.entity';

@Injectable()
export class ResourceService {
  constructor(
    @InjectModel(ResourceEntity.name)
    private readonly resourceRepository: Model<ResourceEntity>,
  ) {}

  public async createResource(createResourceDto: CreateResourceDto): Promise<ResourceEntityWithId> {
    return new this.resourceRepository(createResourceDto).save();
  }

  public bulkInsertResources(
    createResourceDto: CreateResourceDto[],
  ): Promise<ResourceEntityWithId[]> {
    return this.resourceRepository.insertMany(createResourceDto).catch((err) => {
      throw err;
    });
  }

  public bulkRemoveResources(field: string, values: string[]) {
    return this.resourceRepository.remove({ [field]: { $in: values } });
  }

  public async getResources(): Promise<ResourceEntity[]> {
    return this.resourceRepository
      .find({})
      .populate({
        path: 'permissions',
        model: PermissionEntity.name,
      })
      .exec();
  }

  public async updateResourceById(
    id: Types.ObjectId,
    payload: UpdateResourceDto,
  ): Promise<ResourceEntityWithId> {
    return this.resourceRepository.findByIdAndUpdate(id, payload, { new: true }).exec();
  }

  public async deleteResourceById(id: Types.ObjectId): Promise<ResourceEntityWithId> {
    return this.resourceRepository.findByIdAndRemove(id).exec();
  }

  public async getResourceBy(
    options: any,
    populate: any = {},
  ): Promise<ResourceEntityWithId | null> {
    const resource: ResourceEntityWithId = await this.resourceRepository
      .findOne(options)
      .populate(populate)
      .exec();
    if (!resource) {
      throw new NotFoundException(createError(ErrorTypeEnum.RESOURCE_NOT_FOUND, options));
    }
    return resource;
  }

  public async getResourceById(id: Types.ObjectId): Promise<ResourceEntityWithId | null> {
    return this.getResourceBy(
      { _id: id },
      {
        path: 'permissions',
        model: PermissionEntity.name,
      },
    );
  }
}
