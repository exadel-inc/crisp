import { ApiProperty } from '@nestjs/swagger';
import { Type } from '@nestjs/common';

export interface PaginationI<Entity> {
  readonly result: Entity[];
  readonly total: number;
}

export function PaginationMixin<Entity>(classRef: Type<Entity>): any & PaginationI<Entity> {
  abstract class Pagination implements PaginationI<Entity> {
    /**
     * Result of the selection by the specified parameters.
     */
    @ApiProperty({
      type: classRef,
      isArray: true,
      description: 'Result of the selection by the specified parameters',
    })
    public readonly result: Entity[];

    /**
     * Total number of records.
     */
    @ApiProperty({
      description: 'Total number of records',
    })
    public readonly total: number;
  }

  return Pagination;
}
