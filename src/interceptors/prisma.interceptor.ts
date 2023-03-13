import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CustomException } from '../exceptions/custom.exception';
import { extractPrismaError } from '../shared/helpers';

@Injectable()
export class PrismaInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          const message = extractPrismaError(error);

          throw new CustomException(HttpStatus.BAD_REQUEST, message);
        } else {
          throw error;
        }
      }),
    );
  }
}
