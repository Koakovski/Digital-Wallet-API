import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('app')
export class AppController {
  @Get()
  @ApiOkResponse({
    type: String,
    description: 'Health check response was successful',
  })
  healthCheck(): string {
    return 'ok 👍';
  }
}
