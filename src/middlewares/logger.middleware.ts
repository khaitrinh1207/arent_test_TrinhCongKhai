import { LoggerService } from '../logger/logger.service';
import { Request, Response } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(public readonly logger: LoggerService) {}

  use(req: Request, res: Response, next: CallableFunction) {
    this.logger.log(`
      [Api request] ${req.headers['content-type'] || req.headers['host']}
      ${req.method} ${req.originalUrl}
      Token: ${req.headers['authorization'] || null}
      Body: ${JSON.stringify(req.body || null)}`);

    res.on('close', () => {
      const { statusCode } = res;
      const contentLength = res.get('content-length');

      this.logger.log(`
      [Api response] ${req.headers['content-type'] || req.headers['host']} ${
        req.method
      }: ${statusCode} - ${contentLength}
      `);
    });

    next();
  }
}
