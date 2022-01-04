import { PartialType } from '@nestjs/swagger';
import { CreatePatternDto } from './create-pattern.dto';

export class UpdatePatternDto extends PartialType(CreatePatternDto) {}
