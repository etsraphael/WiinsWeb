import { ProfileModel } from '../baseUser/profile.model';

export abstract class BaseNotification {
  _id: string;
  read: Boolean;
  createdAt: Date;
  updatedAt: Date;
  quantity: number;
  type: string;
}
