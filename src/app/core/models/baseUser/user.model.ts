import {BaseModel} from './base.model';
import { DatePipe } from '@angular/common';
import { ConfigurationModel } from './configuration';

export class UserModel extends BaseModel {
  pseudo: string;
  email: string;
  password: string;
  active: boolean;
  profile: string;
  deactivatedAt: DatePipe;
  createdAt: DatePipe;
  deletedAt: DatePipe;
  updatedAt: DatePipe;
  config: ConfigurationModel;
  chargedUntil: Date;

  constructor( _id: string, pseudo: string, email: string, password: string ) {
    super(_id);
    this.pseudo = pseudo;
    this.email = email;
    this.password = password;
  }
}
