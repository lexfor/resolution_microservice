import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResolutionValueDto {
  @ApiProperty()
  @Length(3, 50)
  @IsString()
  value: string;
}
