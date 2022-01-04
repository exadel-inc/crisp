import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePatternDataDto {
  @ApiProperty({ example: 'pattern name' })
  public readonly id: Types.ObjectId;

  @ApiProperty({
    type: Object,
    description: 'Pattern Data',
  })
  public readonly customVars: {
    [key: string]: string | undefined;
  };
}
