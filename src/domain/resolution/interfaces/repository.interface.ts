import { ResolutionEntity } from '../entities/resolution.entity';

export interface IResolutionRepository {
  addResolution: (
    resolutionEntity: ResolutionEntity,
  ) => Promise<ResolutionEntity>;
  getAllResolutions: (patientID: string) => Promise<ResolutionEntity[]>;
  getResolutionByID: (resolutionID: string) => Promise<ResolutionEntity>;
  deleteResolution: (resolutionID: string) => Promise<string>;
}
