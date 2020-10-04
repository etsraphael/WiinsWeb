import { ProfileModel } from '../../baseUser/profile.model';
import { PageModel } from '../../page/page.model';

export abstract class FeedPublication {
  _id: string
  createdAt: Date
  updatedAt: Date
  like: { likeNumber: number, likeId: string, isLike: boolean }
  profile: ProfileModel
  page: PageModel
  commentNumber: number

  constructor(public type: string, public hastags: string[]) { }
}

export class PicturePublication extends FeedPublication  {
  constructor(
    public hastags: string[],
    public profileTagged: string[],
    public file: string,
    public text: string,
    public space: string,
    public idSpace?: string,
    public group?: string) {
    super('PicturePublication', hastags)
  }
}

export class PostPublication extends FeedPublication  {
  constructor(
    public hastags: string[],
    public profileTagged: string[],
    public background: string,
    public text: string,
    public space: string,
    public idSpace?: string,
    public group?: string) {
    super('PostPublication', hastags)
  }
}

export class VideoPublication extends FeedPublication  {
  constructor(
    public hastags: string[],
    public profileTagged: string[],
    public text: string,
    public file: string,
    public poster: string,
    public space: string,
    public idSpace?: string,
    public group?: string) {
    super('VideoPublication', hastags)
  }
}

export class PublicationEvent extends FeedPublication  {
  constructor(
    public hastags: string[],
    public filepicture: string,
    public participant: ProfileModel[],
    public StartDate: string,
    public EndDate: string,
    public visibility: string) {
    super('EventPublication', hastags)
  }
}
