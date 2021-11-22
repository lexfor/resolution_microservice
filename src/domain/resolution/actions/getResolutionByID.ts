import { ResolutionRepository } from '../resolution.repository';
import { ResolutionEntity } from '../entities/resolution.entity';
import { Inject } from '@nestjs/common';

export class GetResolutionByID {
  constructor(
    @Inject('DATABASE_REPOSITORY')
    private readonly repository: ResolutionRepository,
  ) {}

  async getResolutionByID(resolutionID: string): Promise<ResolutionEntity> {
    return await this.repository.getResolutionByID(resolutionID);
  }
}
