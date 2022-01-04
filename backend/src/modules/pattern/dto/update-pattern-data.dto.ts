import { PartialType } from '@nestjs/swagger';
import { CreatePatternDataDto } from './create-pattern-data.dto';

export class UpdatePatternDataDto extends PartialType(CreatePatternDataDto) {}
