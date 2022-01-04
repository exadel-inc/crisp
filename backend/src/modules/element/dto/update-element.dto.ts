import { PartialType } from '@nestjs/swagger';
import { CreateElementDto } from './create-element.dto';

export class UpdateElementDto extends PartialType(CreateElementDto) {}
