import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateResolutionDto {
  @ApiProperty()
  @IsString()
  value: string;
  @ApiProperty()
  @IsUUID('all')
  patient_id: string;
  @ApiProperty()
  @IsString()
  doctor_name: string;
  @ApiProperty()
  @IsString()
  doctor_specialization: string;
}
