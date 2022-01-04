import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreatePatternDto, UpdatePatternDto } from '../dto';
import { PatternEntity, PatternEntityWithId } from '../pattern.entity';

@Injectable()
export class PatternService {
  constructor(
    @InjectModel(PatternEntity.name) private readonly patternRepository: Model<PatternEntity>,
  ) {}

  public async createPattern(createPatternDto: CreatePatternDto): Promise<PatternEntityWithId> {
    return new this.patternRepository(createPatternDto).save();
  }

  public async getPatternById(id: Types.ObjectId): Promise<PatternEntityWithId | null> {
    return this.patternRepository.findOne({ _id: id }).exec();
  }

  public async getPatternByName(name: string): Promise<PatternEntityWithId | null> {
    return this.patternRepository.findOne({ name }).exec();
  }

  public bulkInsertPatterns(createPatternDto: CreatePatternDto[]): Promise<PatternEntityWithId[]> {
    return this.patternRepository.insertMany(createPatternDto).catch((err) => {
      throw err;
    });
  }

  public bulkRemovePatterns(field: string, values: string[]) {
    return this.patternRepository.remove({ [field]: { $in: values } });
  }

  public async getPatterns(): Promise<PatternEntity[]> {
    return this.patternRepository.find({});
  }

  public removePattern(field: string, value: string) {
    return this.patternRepository
      .find({ [field]: value })
      .remove()
      .exec();
  }

  public async updatePatternById(
    id: Types.ObjectId,
    payload: UpdatePatternDto,
  ): Promise<PatternEntityWithId> {
    return this.patternRepository.findByIdAndUpdate(id, payload, { new: true }).exec();
  }

  public async deletePatternById(id: Types.ObjectId): Promise<PatternEntityWithId> {
    return this.patternRepository.findByIdAndRemove(id).exec();
  }
}
