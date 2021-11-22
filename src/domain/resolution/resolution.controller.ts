import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  OnModuleInit,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateResolutionDto } from './dto/create-resolution.dto';
import { ResolutionValueDto } from './dto/resolution-value.dto';
import { ResolutionEntity } from './entities/resolution.entity';
import { AddResolution } from './actions/addResolution';
import { GetAllResolutions } from './actions/getAllResolutions';
import { DeleteResolution } from './actions/deleteResolution';
import { IDoctorService } from './interfaces/doctor.service.interface';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { IPatientService } from './interfaces/patients.service.interface';
import { JwtGuard } from '../../infrastructure/guards/jwt.guard';
import { join } from 'path';
import { lastValueFrom } from 'rxjs';
import { IDoctorMessage } from './interfaces/doctor-message.interface';
import { IPatientMessage } from './interfaces/patient-message.interface';
import { GetResolutionByID } from './actions/getResolutionByID';
import {
  ApiAcceptedResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

@ApiTags('Resolutions')
@ApiBearerAuth()
@Controller('api/resolution')
@UseGuards(JwtGuard)
export class ResolutionController implements OnModuleInit {
  @Client({
    transport: Transport.GRPC,
    options: {
      url: process.env.USERS_MICROSERVICE_GRPC,
      package: 'lab',
      protoPath: join(__dirname, '../../../grpc/grpc.proto'),
    },
  })
  client: ClientGrpc;
  private doctorService: IDoctorService;
  private patientService: IPatientService;

  constructor(
    private readonly addResolutionClass: AddResolution,
    private readonly getAllResolutionsClass: GetAllResolutions,
    private readonly deleteResolutionClass: DeleteResolution,
    private readonly getResolutionByIDClass: GetResolutionByID,
    private readonly configService: ConfigService,
  ) {
    console.log(process.env.USERS_MICROSERVICE_GRPC);
  }

  onModuleInit() {
    this.patientService =
      this.client.getService<IPatientService>('PatientService');
    this.doctorService =
      this.client.getService<IDoctorService>('DoctorService');
  }

  @ApiCreatedResponse({
    description: 'created resolution',
    type: ResolutionEntity,
  })
  @Post('/patient/:id')
  async addResolution(
    @Body(ValidationPipe) resolutionValueDto: ResolutionValueDto,
    @Req() { user },
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResolutionEntity> {
    const doctor: IDoctorMessage = await lastValueFrom(
      this.doctorService.getDoctorByUserID({
        userID: user,
      }),
    );
    if (doctor.id === null) {
      throw new HttpException('doctor not exist', HttpStatus.BAD_REQUEST);
    }
    const patient: IPatientMessage = await lastValueFrom(
      this.patientService.getPatientByID({
        userID: id,
      }),
    );
    if (patient.id === null) {
      throw new HttpException('patient not exist', HttpStatus.BAD_REQUEST);
    }
    const createResolutionDto: CreateResolutionDto = {
      value: resolutionValueDto.value,
      patient_id: id,
      doctor_name: doctor.name,
      doctor_specialization: doctor.specialization,
      delay: Number(this.configService.get('TTL_DELAY')),
    };
    return await this.addResolutionClass.addResolution(createResolutionDto);
  }

  @ApiOkResponse({
    description: 'all patient resolutions',
    type: ResolutionEntity,
    isArray: true,
  })
  @Get('/all/patient/me')
  async getAllMyResolutions(@Req() { user }): Promise<ResolutionEntity[]> {
    const patient: IPatientMessage = await lastValueFrom(
      this.patientService.getPatientByUserID({
        userID: user,
      }),
    );
    if (patient.id === null) {
      throw new HttpException('patient not exist', HttpStatus.BAD_REQUEST);
    }
    const resolutions: ResolutionEntity[] =
      await this.getAllResolutionsClass.getAllResolutions(patient.id);
    return resolutions.filter((resolution) => resolution.getID !== null);
  }

  @ApiOkResponse({
    description: 'all patient resolutions',
    type: ResolutionEntity,
    isArray: true,
  })
  @Get('/all/patient/:id')
  async getAllResolutions(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResolutionEntity[]> {
    const patient: IPatientMessage = await lastValueFrom(
      this.patientService.getPatientByID({
        userID: id,
      }),
    );
    if (patient.id === null) {
      throw new HttpException('patient not exist', HttpStatus.BAD_REQUEST);
    }
    const resolutions: ResolutionEntity[] =
      await this.getAllResolutionsClass.getAllResolutions(id);
    return resolutions.filter((resolution) => resolution.getID !== null);
  }

  @ApiAcceptedResponse({
    description: 'deleted resolution ID',
  })
  @HttpCode(HttpStatus.ACCEPTED)
  @Delete(':id')
  async deleteResolution(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<string> {
    const resolution: ResolutionEntity =
      await this.getResolutionByIDClass.getResolutionByID(id);
    if (resolution.getID === null) {
      throw new HttpException('resolution not exist', HttpStatus.BAD_REQUEST);
    }
    return await this.deleteResolutionClass.deleteResolution(id);
  }
}
