import { classToPlain, plainToClass } from 'class-transformer';

import { FindOneOptionsDto } from './find-one-options.dto';

describe('FindOneOptionsDto', () => {
  it('should be defined', () => {
    expect(new FindOneOptionsDto()).toBeDefined();
  });

  describe('select', () => {
    it('should be return array select fields', () => {
      const plain = { select: ['id'] };
      const classDto = plainToClass(FindOneOptionsDto, plain);
      const instanceDto = classToPlain(classDto);
      expect(instanceDto).toMatchObject(plain);
    });
  });

  describe('relations', () => {
    it('should be return array relation fields', () => {
      const plain = { relations: ['id'] };
      const classDto = plainToClass(FindOneOptionsDto, plain);
      const instanceDto = classToPlain(classDto);
      expect(instanceDto).toMatchObject(plain);
    });
  });
});
