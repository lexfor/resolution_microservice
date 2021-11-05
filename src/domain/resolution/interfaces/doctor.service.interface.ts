import { Observable } from 'rxjs';
import { IDoctorMessage } from './doctor-message.interface';
import { IUserIDMessage } from './userID-message.interface';

export interface IDoctorService {
  getDoctorByUserID(data: IUserIDMessage): Observable<IDoctorMessage>;
}
