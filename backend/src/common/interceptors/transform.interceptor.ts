import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {
  ExecutionContext,
  NestInterceptor,
  CallHandler,
  Injectable,
  HttpStatus,
} from '@nestjs/common';

export interface Response<T> {
  data: { result: string[] | T } | (string[] | T);
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(map((data) => ({ data, statusCode: HttpStatus.OK })));
  }
}
