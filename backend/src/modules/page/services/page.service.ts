import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ErrorTypeEnum } from 'src/common/enums';
import { createError } from 'src/common/helpers';
import { CreatePageDto, UpdatePageDto } from '../dto';
import { PageEntity, PageEntityWithId } from '../page.entity';

@Injectable()
export class PageService {
  constructor(@InjectModel(PageEntity.name) private readonly pageRepository: Model<PageEntity>) {}

  public async createPage(createPageDto: CreatePageDto): Promise<PageEntityWithId> {
    return new this.pageRepository(createPageDto).save();
  }

  public bulkInsertPages(createPageDto: CreatePageDto[]): Promise<PageEntityWithId[]> {
    return this.pageRepository.insertMany(createPageDto).catch((err) => {
      throw err;
    });
  }

  public bulkRemovePages(field: string, values: string[]) {
    return this.pageRepository.remove({ [field]: { $in: values } });
  }

  public async getPages(): Promise<PageEntity[]> {
    return this.pageRepository.find({});
  }

  public removePage(field: string, value: string) {
    return this.pageRepository
      .find({ [field]: value })
      .remove()
      .exec();
  }

  public async updatePageById(
    id: Types.ObjectId,
    payload: UpdatePageDto,
  ): Promise<PageEntityWithId> {
    return this.pageRepository.findByIdAndUpdate(id, payload, { new: true }).exec();
  }

  public async deletePageById(id: Types.ObjectId): Promise<PageEntityWithId> {
    return this.pageRepository.findByIdAndRemove(id).exec();
  }

  public async getPageBy(options: any): Promise<PageEntityWithId | null> {
    const page: PageEntityWithId = await this.pageRepository.findOne(options).exec();
    if (!page) {
      throw new NotFoundException(createError(ErrorTypeEnum.PAGE_NOT_FOUND, options));
    }
    return page;
  }

  public async getPageById(id: Types.ObjectId): Promise<PageEntityWithId | null> {
    return this.getPageBy({ _id: id });
  }

  public async getPageByName(name: string): Promise<PageEntityWithId | null> {
    return this.getPageBy({ name });
  }
}
