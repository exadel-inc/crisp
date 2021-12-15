import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ID {
  /**
   * Entity ID
   */
  @IsUUID(4)
  @ApiProperty({ example: '98114f04-f417-4bab-8885-53897638659e' })
  public readonly id: string;
}
