import { PartialType } from '@nestjs/swagger';
import { CreateSelectorDto } from './create-selector.dto';

export class UpdateSelectorDto extends PartialType(CreateSelectorDto) {}
