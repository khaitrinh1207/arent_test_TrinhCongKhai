import { ApiProperty } from '@nestjs/swagger';

export class GraphTypeDto {
  @ApiProperty()
  recordedAt: string;
  @ApiProperty()
  weightPercentage: number;
  @ApiProperty()
  bodyFatPercentage: number;
}

export class GraphResponseDto {
  @ApiProperty()
  userId: string;

  @ApiProperty({
    isArray: true,
    type: GraphTypeDto,
  })
  graph: GraphTypeDto[];
}
