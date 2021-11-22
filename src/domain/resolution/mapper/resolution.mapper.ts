import { IResolution } from '../interfaces/resolution.interface';
import { ResolutionEntity } from '../entities/resolution.entity';

export class ResolutionMapper {
  toEntity(resolution: IResolution): ResolutionEntity {
    return new ResolutionEntity(
      resolution.value,
      resolution.patient_id,
      resolution.doctor_name,
      resolution.doctor_specialization,
      resolution.delay,
      resolution.id,
      resolution.created_time,
    );
  }

  toRow(resolutionEntity: ResolutionEntity): IResolution {
    return {
      id: resolutionEntity.getID,
      value: resolutionEntity.getValue,
      patient_id: resolutionEntity.getPatientID,
      doctor_name: resolutionEntity.getDoctorName,
      doctor_specialization: resolutionEntity.getDoctorSpecialization,
      delay: resolutionEntity.getDelay,
      created_time: resolutionEntity.getCreatedTime,
    };
  }
}
