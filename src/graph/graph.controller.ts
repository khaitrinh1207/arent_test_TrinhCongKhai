import { Controller, Get, Param } from '@nestjs/common';
import { GraphService } from './graph.service';
import { ApiBadRequestResponse, ApiBearerAuth, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CurrentUser, CustomApiOkResponse } from '../shared/decorators';
import { ResponseDto, ResponseErrorDTO } from '../shared/base';
import { GraphResponseDto } from './dtos/graph.dto';
import { UserByIdResponseDto } from '../user/dtos';
import { ERROR_MESSAGE } from '../shared/constants';

@Controller('graphs')
@ApiTags('graphs')
export class GraphController {
  constructor(private readonly graphService: GraphService) {
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'get graph metrics',
  })
  @CustomApiOkResponse(GraphResponseDto)
  @ApiUnauthorizedResponse({
    type: ResponseErrorDTO,
    description: ERROR_MESSAGE.UNAUTHORIZED.message,
  })
  @ApiBadRequestResponse({
    type: ResponseErrorDTO,
    description: ERROR_MESSAGE.BAD_REQUEST.message,
  })
  @Get(':months')
  async getPercentageGraph(
    @CurrentUser('id') id: string,
    @Param('months') months: string,
  ): Promise<ResponseDto<GraphResponseDto>> {
    return this.graphService.getPercentageGraph(id, +months);
  }
}
