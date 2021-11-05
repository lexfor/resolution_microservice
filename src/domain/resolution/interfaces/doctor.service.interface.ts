import { IDoctor } from './doctor.interface';

export interface IDoctorService {
  getDoctorByUserID(data: string): IDoctor;
}
