import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class ExceptionFilterAllInterceptor implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let errorResponse: any = {
      status: 500,
      message: 'Error interno inesperado',
    };

    if (exception && (exception as HttpException).getResponse) {
      errorResponse = (exception as HttpException).getResponse() as any;
    } else {
      console.log('error', exception);
      errorResponse = { status: 500, message: 'Error interno inesperado' };
    }

    if (typeof exception === 'string') {
      errorResponse = { status: 500, message: exception };
    }

    response.status(200).json({
      statusCode: status,
      ...errorResponse,
    });
  }
}
