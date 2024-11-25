import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  statusCode: 200;
  data: T;
}

@Injectable()
export class StandardResponseInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    try {
      return next.handle().pipe(map((data) => ({ statusCode: 200, data })));
    } catch (error) {
      return next.handle().pipe(map((data) => ({ statusCode: 200, data })));
    }
  }
}
