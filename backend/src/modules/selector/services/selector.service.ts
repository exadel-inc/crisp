import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ErrorTypeEnum } from '../../../common/enums';
import { createError } from '../../../common/helpers';
import { CreateSelectorDto, UpdateSelectorDto } from '../dto';
import { SelectorEntity, SelectorEntityWithId } from '../selector.entity';

@Injectable()
export class SelectorService {
  constructor(
    @InjectModel(SelectorEntity.name) private readonly selectorRepository: Model<SelectorEntity>,
  ) {}

  public async createSelector(createSelectorDto: CreateSelectorDto): Promise<SelectorEntityWithId> {
    return new this.selectorRepository(createSelectorDto).save();
  }

  public bulkInsertSelectors(
    createSelectorDto: CreateSelectorDto[],
  ): Promise<SelectorEntityWithId[]> {
    return this.selectorRepository.insertMany(createSelectorDto).catch((err) => {
      throw err;
    });
  }

  public bulkRemoveSelectors(field: string, values: string[]) {
    return this.selectorRepository.remove({ [field]: { $in: values } });
  }

  public async getSelectors(): Promise<SelectorEntity[]> {
    return this.selectorRepository.find({});
  }

  public removeSelector(field: string, value: string) {
    return this.selectorRepository
      .find({ [field]: value })
      .remove()
      .exec();
  }

  public async updateSelectorById(
    id: Types.ObjectId,
    payload: UpdateSelectorDto,
  ): Promise<SelectorEntityWithId> {
    return this.selectorRepository.findByIdAndUpdate(id, payload, { new: true }).exec();
  }

  public async deleteSelectorById(id: Types.ObjectId): Promise<SelectorEntityWithId> {
    return this.selectorRepository.findByIdAndRemove(id).exec();
  }

  public async getSelectorBy(options: any): Promise<SelectorEntityWithId | null> {
    const selector: SelectorEntityWithId = await this.selectorRepository.findOne(options).exec();
    if (!selector) {
      throw new NotFoundException(createError(ErrorTypeEnum.SELECTOR_NOT_FOUND, options));
    }
    return selector;
  }

  public async getSelectorById(id: Types.ObjectId): Promise<SelectorEntityWithId | null> {
    return this.getSelectorBy({ _id: id });
  }
}
