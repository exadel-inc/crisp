import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ErrorTypeEnum } from 'src/common/enums';
import { createError } from 'src/common/helpers';
import { PatternDataService } from '../../../modules/pattern';
import { SelectorService } from '../../../modules/selector';
import { CreateElementDto, UpdateElementDto } from '../dto';
import { ElementEntity, ElementEntityWithId } from '../element.entity';

@Injectable()
export class ElementService {
  constructor(
    @InjectModel(ElementEntity.name) private readonly elementRepository: Model<ElementEntity>,
    private readonly selectorService: SelectorService,
    private readonly patternDataService: PatternDataService,
  ) {}

  public async createElement(createElementDto: CreateElementDto): Promise<ElementEntityWithId> {
    await this.selectorService.createSelector(createElementDto.selectors);
    const setObjectPatternData = async (params) => {
      if (!params.pageObjectPattern) return params.pageObjectPattern;
      const pageObjectPattern = await this.patternDataService.createPatternData(
        params.pageObjectPattern,
      );
      return pageObjectPattern._id;
    };

    const setActionPatternData = async (params) => {
      if (!params.actionPatterns.length) return params.actionPatterns;
      const pageActionPatterns = await Promise.all(
        createElementDto.actionPatterns.map(
          this.patternDataService.createPatternData.bind(this.patternDataService),
        ),
      );
      return pageActionPatterns.map((pattern: any) => pattern._id);
    };

    const pageObjectPatternId = await setObjectPatternData(createElementDto);
    const actionPatternIds = await setActionPatternData(createElementDto);

    const { name, description, pageId, parentElementId } = createElementDto;

    return new this.elementRepository({
      name,
      description,
      pageId,
      parentElementId,
      actionPatternIds,
      pageObjectPatternId,
    }).save();
  }

  public async bulkInsertElements(
    createElementDto: CreateElementDto[],
  ): Promise<ElementEntityWithId[]> {
    return this.elementRepository.insertMany(createElementDto).catch((err) => {
      throw err;
    });
  }

  public bulkRemoveElements(field: string, values: string[]) {
    return this.elementRepository.remove({ [field]: { $in: values } });
  }

  public async getElements(): Promise<ElementEntity[]> {
    return this.elementRepository.find({});
  }

  public removeElement(field: string, value: string) {
    return this.elementRepository
      .find({ [field]: value })
      .remove()
      .exec();
  }

  public async updateElementById(
    id: Types.ObjectId,
    payload: UpdateElementDto,
  ): Promise<ElementEntityWithId> {
    return this.elementRepository.findByIdAndUpdate(id, payload, { new: true }).exec();
  }

  public async deleteElementById(id: Types.ObjectId): Promise<ElementEntityWithId> {
    return this.elementRepository.findByIdAndRemove(id).exec();
  }

  public async getElementBy(options: any): Promise<ElementEntityWithId | null> {
    const element: ElementEntityWithId = await this.elementRepository.findOne(options).exec();
    if (!element) {
      throw new NotFoundException(createError(ErrorTypeEnum.ELEMENT_NOT_FOUND, options));
    }
    return element;
  }

  public async getElementById(id: Types.ObjectId): Promise<ElementEntityWithId | null> {
    return this.getElementBy({ _id: id });
  }
}
