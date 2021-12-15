import { Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Min, Max, IsArray, IsString, IsNotEmpty, IsOptional } from 'class-validator';

import { FindOneOptionsDto } from '../find-one-options';

export class FindManyOptionsDto<Entity> extends FindOneOptionsDto<Entity> {
  /**
   * Order, in which entities should be ordered
   */
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @Transform((value) => [].concat(value))
  @ApiProperty({
    type: [String],
    example: ['id'],
    description: 'Order, in which entities should be ordered.',
  })
  public readonly asc?: string[];

  /**
   * If the same fields are specified for sorting in two directions, the priority is given to DESC
   */
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @Transform((value) => [].concat(value))
  @ApiProperty({
    type: [String],
    example: ['id'],
    description:
      'If the same fields are specified for sorting in two directions, the priority is given to DESC',
  })
  public readonly desc?: [keyof Entity];

  /**
   * Getter to form an object of order. Available after calling classToPlain
   */
  @Expose()
  get order(): any {
    return Object.assign(
      {},
      ...(this.asc?.map((key) => ({ [key]: 'ASC' })) || []),
      ...(this.desc?.map((key) => ({ [key]: 'DESC' })) || []),
    );
  }

  /**
   * Offset (paginated) where from entities should be taken
   */
  @IsOptional()
  @Min(1)
  @ApiProperty({
    example: 1,
    description: 'Offset (paginated) where from entities should be taken',
  })
  public readonly page?: number = 1;

  /**
   * Getter to form an object of skip. Available after calling classToPlain
   */
  @Expose()
  get skip(): number {
    return this.take * (this.page - 1);
  }

  /**
   * Limit (paginated) - max number of entities should be taken
   */
  @IsOptional()
  @Min(0)
  @Max(50)
  @ApiProperty({
    example: 5,
    default: 5,
    description: 'Limit (paginated) - max number of entities should be taken',
  })
  public readonly take?: number = 5;
}
