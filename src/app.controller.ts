import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('health check')
export class AppController {
  @Get()
  healthCheck(): string {
    return 'Hello world';
  }
}
