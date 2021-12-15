import { CallHandler, NestInterceptor } from '@nestjs/common';
import { Observable, of } from 'rxjs';

import { Response, TransformInterceptor } from './transform.interceptor';

describe('TransformInterceptor', () => {
  let interceptor: NestInterceptor;

  const next: CallHandler = { handle: () => of('test') };
  const context: any = {
    switchToHttp: jest.fn(() => ({
      getResponse: () => ({
        statusCode: 200,
      }),
    })),
  };

  beforeEach(() => {
    interceptor = new TransformInterceptor();
  });

  it('should be defined', () => {
    expect(interceptor).toBeDefined();
  });

  it('should be return', (complete) => {
    const responseInterceptor = interceptor.intercept(context, next) as Observable<any>;
    return responseInterceptor.subscribe({
      next: (data: Response<string>) => {
        expect(data).toEqual({ data: 'test', statusCode: 200 });
      },
      complete,
    });
  });
});
