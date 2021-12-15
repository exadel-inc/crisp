import { classToPlain, plainToClass } from 'class-transformer';

import { FindManyOptionsDto } from './find-many-options.dto';

describe('FindManyOptionsDto', () => {
  it('should be defined', () => {
    expect(new FindManyOptionsDto()).toBeDefined();
  });

  describe('order', () => {
    it('should be return array asc', () => {
      const plain = { asc: ['id'] };
      const classDto = plainToClass(FindManyOptionsDto, plain);
      const instanceDto = classToPlain(classDto);
      expect(instanceDto).toMatchObject({
        order: {
          id: 'ASC',
        },
      });
    });

    it('should be return array desc', () => {
      const plain = { desc: ['id'] };
      const classDto = plainToClass(FindManyOptionsDto, plain);
      const instanceDto = classToPlain(classDto);
      expect(instanceDto).toMatchObject({
        order: {
          id: 'DESC',
        },
      });
    });

    it('should be return array desc ( priority case )', () => {
      const plain = { asc: ['id'], desc: ['id'] };
      const classDto = plainToClass(FindManyOptionsDto, plain);
      const instanceDto = classToPlain(classDto);
      expect(instanceDto).toMatchObject({
        order: {
          id: 'DESC',
        },
      });
    });
  });
});
