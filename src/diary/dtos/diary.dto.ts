import { RequestDTO } from '../../shared/base';
import { PickType } from '@nestjs/swagger';
import { DiaryDto } from '../../shared/generates/prisma/dtos';

export class DiaryRequestDto extends PickType(DiaryDto, ['content', 'title']) {}

export class DiariesRequestDto extends RequestDTO {}

export class DiariesResponseDto extends PickType(DiaryDto, [
  'id',
  'title',
  'content',
  'createdAt',
]) {
  isDelete?: boolean;
  updatedAt?: string;
}
