import { ResolutionRepository } from '../resolution.repository';
import { Inject } from '@nestjs/common';

export class DeleteResolution {
  constructor(
    @Inject('DATABASE_REPOSITORY')
    private readonly repository: ResolutionRepository,
  ) {}

  async deleteResolution(resolutionID: string): Promise<string> {
    return await this.repository.deleteResolution(resolutionID);
  }
}
