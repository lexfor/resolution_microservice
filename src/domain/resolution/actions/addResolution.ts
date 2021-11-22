import { ResolutionRepository } from '../resolution.repository';
import { ResolutionEntity } from '../entities/resolution.entity';
import { CreateResolutionDto } from '../dto/create-resolution.dto';
import { Inject } from '@nestjs/common';

export class AddResolution {
  constructor(
    @Inject('DATABASE_REPOSITORY')
    private readonly repository: ResolutionRepository,
  ) {}

  async addResolution(
    createResolutionDto: CreateResolutionDto,
  ): Promise<ResolutionEntity> {
    const resolution: ResolutionEntity = await ResolutionEntity.create(
      createResolutionDto,
    );
    await this.repository.addResolution(resolution);
    return resolution;
  }
}
