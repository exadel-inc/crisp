import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ErrorTypeEnum } from 'src/common/enums';
import { createError } from 'src/common/helpers';
import { CreateFrameworkDto, UpdateFrameworkDto } from '../dto';
import { FrameworkEntity, FrameworkEntityWithId } from '../framework.entity';

@Injectable()
export class FrameworkService {
  constructor(
    @InjectModel(FrameworkEntity.name) private readonly frameworkRepository: Model<FrameworkEntity>,
  ) {}

  public async createFramework(
    createFrameworkDto: CreateFrameworkDto,
  ): Promise<FrameworkEntityWithId> {
    return new this.frameworkRepository(createFrameworkDto).save();
  }

  public bulkInsertFrameworks(
    createFrameworkDto: CreateFrameworkDto[],
  ): Promise<FrameworkEntityWithId[]> {
    return this.frameworkRepository.insertMany(createFrameworkDto).catch((err) => {
      throw err;
    });
  }

  public bulkRemoveFrameworks(field: string, values: string[]) {
    return this.frameworkRepository.remove({ [field]: { $in: values } });
  }

  public async getFrameworks(): Promise<FrameworkEntity[]> {
    return this.frameworkRepository.find({});
  }

  public removeFramework(field: string, value: string) {
    return this.frameworkRepository
      .find({ [field]: value })
      .remove()
      .exec();
  }

  public async updateFrameworkById(
    id: Types.ObjectId,
    payload: UpdateFrameworkDto,
  ): Promise<FrameworkEntityWithId> {
    return this.frameworkRepository.findByIdAndUpdate(id, payload, { new: true }).exec();
  }

  public async deleteFrameworkById(id: Types.ObjectId): Promise<FrameworkEntityWithId> {
    return this.frameworkRepository.findByIdAndRemove(id).exec();
  }

  public async getFrameworkBy(options: any): Promise<FrameworkEntityWithId | null> {
    const framework: FrameworkEntityWithId = await this.frameworkRepository.findOne(options).exec();
    if (!framework) {
      throw new NotFoundException(createError(ErrorTypeEnum.FRAMEWORK_NOT_FOUND, options));
    }
    return framework;
  }

  public async getFrameworkById(id: Types.ObjectId): Promise<FrameworkEntityWithId | null> {
    return this.getFrameworkBy({ _id: id });
  }

  public async getFrameworkByName(name: string): Promise<FrameworkEntityWithId | null> {
    return this.getFrameworkBy({ name });
  }
}
