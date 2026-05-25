import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>();
    const { method, url, body } = request;
    const startTime = Date.now();

    return next.handle().pipe(
      tap({
        next: () => {
          const duration = Date.now() - startTime;
          this.logger.log(
            JSON.stringify({
              event: 'http.request',
              method,
              url,
              durationMs: duration,
              status: 200,
            }),
          );
        },
        error: (error) => {
          const duration = Date.now() - startTime;
          this.logger.error(
            JSON.stringify({
              event: 'http.request.error',
              method,
              url,
              durationMs: duration,
              status: error.status || 500,
              message: error.message,
            }),
          );
        },
      }),
    );
  }
}
