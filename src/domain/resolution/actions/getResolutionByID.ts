import { ResolutionRepository } from '../resolution.repository';
import { ResolutionEntity } from '../entities/resolution.entity';
import { Inject } from '@nestjs/common';

export class GetResolution {
  constructor(
    @Inject('DATABASE_REPOSITORY')
    private readonly repository: ResolutionRepository,
  ) {}

  async getResolution(patientID: string): Promise<ResolutionEntity> {
    return await this.repository.getResolutionByID(patientID);
  }
}
