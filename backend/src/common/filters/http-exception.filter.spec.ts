import { NotFoundException } from '@nestjs/common';

import { HttpExceptionFilter } from './http-exception.filter';

describe('HttpExceptionFilter', () => {
  let filter: HttpExceptionFilter;

  const exception = new NotFoundException();
  const context: any = {
    switchToHttp: jest.fn(() => ({
      getResponse: () => ({
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        status: function (code: number) {
          return this;
        },
        send: function (data: any) {
          return data;
        },
      }),
    })),
  };

  beforeEach(() => {
    filter = new HttpExceptionFilter();
  });

  it('should be defined', () => {
    expect(filter).toBeDefined();
  });

  it('should return an error in specified format', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { message, statusCode, ...error } = exception.getResponse() as Record<string, any>;
    const received = filter.catch(exception, context);
    expect(received).toEqual({
      messages: [{ message: 'Not Found', statusCode: 404 }],
      statusCode: 404,
    });
  });
});
