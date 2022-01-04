import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createError } from '../../../common/helpers';
import { PatternService } from '.';
import { CreatePatternDataDto } from '../dto';
import { PatternDataEntity, PatternDataEntityWithId } from '../pattern-data.entity ';
import { ErrorTypeEnum } from 'src/common/enums';

@Injectable()
export class PatternDataService {
  constructor(
    @InjectModel(PatternDataEntity.name)
    private readonly patternDataRepository: Model<PatternDataEntity>,
    private readonly patternService: PatternService,
  ) {}

  public async createPatternData(
    createPatternDataDto: CreatePatternDataDto,
  ): Promise<PatternDataEntityWithId> {
    if (!(await this.patternService.getPatternById(createPatternDataDto.id))) {
      throw new NotFoundException(
        createError(ErrorTypeEnum.PATTERN_NOT_FOUND, String(createPatternDataDto.id)),
      );
    }
    return new this.patternDataRepository(createPatternDataDto).save();
  }
}
