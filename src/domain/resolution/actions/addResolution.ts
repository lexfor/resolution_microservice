import { ResolutionRepository } from "../resolution.repository";
import { ResolutionEntity } from "../entities/resolution.entity";

export class AddResolution {
  constructor(
    private readonly repository: ResolutionRepository,
    private readonly entity: ResolutionEntity,
  ) {}

  async addResolution(
    createPatientDto: CreatePatientDto,
  ): Promise<PatientEntity> {
    const patientEntity: PatientEntity = await this.entity.create(
      createPatientDto,
    );
    await this.repository.createPatient(patientEntity);
    return patientEntity;
  }
}
