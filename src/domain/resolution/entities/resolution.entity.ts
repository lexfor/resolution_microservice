import { v1 as uuidv1 } from 'uuid';
import { CreateResolutionDto } from '../dto/create-resolution.dto';
import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

@Injectable()
export class ResolutionEntity {
  @ApiProperty()
  private readonly id: string;
  @ApiProperty()
  private readonly delay: number;
  @ApiProperty()
  private readonly createdTime: string;
  @ApiProperty()
  private readonly value: string;
  @ApiProperty()
  private readonly patientID: string;
  @ApiProperty()
  private readonly doctorName: string;
  @ApiProperty()
  private readonly doctorSpecialization: string;

  constructor(
    value: string,
    patientID: string,
    doctorName: string,
    doctorSpecialization: string,
    delay = 30000,
    id: string = uuidv1(),
    createdTime: string = new Date().toISOString(),
  ) {
    this.id = id;
    this.value = value;
    this.patientID = patientID;
    this.doctorName = doctorName;
    this.doctorSpecialization = doctorSpecialization;
    this.delay = delay;
    this.createdTime = createdTime;
  }

  static async create(createResolutionDto: CreateResolutionDto) {
    return new ResolutionEntity(
      createResolutionDto.value,
      createResolutionDto.patient_id,
      createResolutionDto.doctor_name,
      createResolutionDto.doctor_specialization,
      createResolutionDto.delay,
    );
  }

  get getID(): string {
    return this.id;
  }

  get getValue(): string {
    return this.value;
  }

  get getDelay(): number {
    return this.delay;
  }

  get getCreatedTime(): string {
    return this.createdTime;
  }

  get getPatientID(): string {
    return this.patientID;
  }

  get getDoctorName(): string {
    return this.doctorName;
  }

  get getDoctorSpecialization(): string {
    return this.doctorSpecialization;
  }
}
