import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, unknown> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map((data) => {
        // Don't double-wrap if already wrapped (e.g., paginated)
        if (data && typeof data === 'object' && ('success' in data || 'data' in data)) {
          return data;
        }
        return { success: true, data };
      }),
    );
  }
}
