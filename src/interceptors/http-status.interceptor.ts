import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class HttpStatusInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse();
        console.log(
          `[${new Date().toISOString()}] ${request.method} ${request.url} ${
            response.statusCode
          }`,
        );
      }),
      tap(null, (error) => {
        const response = context.switchToHttp().getResponse();
        console.error(
          `[${new Date().toISOString()}] ${request.method} ${request.url} ${
            response.statusCode
          } ${error} ${error.stack}`,
        );
      }),
      map((data) => {
        const response = context.switchToHttp().getResponse();
        if (response.statusCode === 200 || response.statusCode === 201) {
          return {
            statusCode: response.statusCode,
            data: data,
          };
        } else {
          return data.message;
        }
      }),
    );
  }
}
