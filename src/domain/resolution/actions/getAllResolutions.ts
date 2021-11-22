import { ResolutionRepository } from '../resolution.repository';
import { ResolutionEntity } from '../entities/resolution.entity';
import { Inject } from '@nestjs/common';

export class GetAllResolutions {
  constructor(
    @Inject('DATABASE_REPOSITORY')
    private readonly repository: ResolutionRepository,
  ) {}

  async getAllResolutions(patientID: string): Promise<ResolutionEntity[]> {
    return await this.repository.getAllResolutions(patientID);
  }
}
