import { NameAndCode } from '../../data/music-genre';
import { ProfileModel } from '../baseUser/profile.model';

export class MusicCreditModel {

  constructor(
    public name: string,
    public index?: number,
    public interpreters?: string[] | any[],
    public writters?: string[],
    public producers?: string[],
    public feat?: ProfileModel[],
    public categories?: NameAndCode[],
  ) { }
  
}