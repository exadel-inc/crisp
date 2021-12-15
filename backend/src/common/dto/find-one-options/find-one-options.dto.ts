import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Min, IsArray, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class FindOneOptionsDto<Entity> {
  /**
   * Specifies what columns should be retrieved
   */
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @Transform((value) => [].concat(value))
  @ApiProperty({
    type: [String],
    example: ['id'],
    description: 'Specifies what columns should be retrieved',
  })
  public readonly select?: [keyof Entity];

  /**
   * Indicates what relations of entity should be loaded (simplified left join form)
   */
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @Transform((value) => [].concat(value))
  @ApiProperty({
    type: [String],
    description: 'Indicates what relations of entity should be loaded',
  })
  public readonly relations?: string[];

  /**
   * Enables or disables query result caching.
   */
  @IsOptional()
  @Min(0)
  @ApiProperty({
    example: 0,
    description: 'Enables or disables query result caching',
  })
  public readonly cache?: number = null;
}
