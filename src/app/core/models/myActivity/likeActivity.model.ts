import { BaseActivityModel } from './baseActivity.model';

export class LikeActivityModel extends BaseActivityModel {
  commentId: string;
  publicationId: string;
  createdAt: Date;
  publicationProfile: string;

  constructor(publicationId: string, createdAt: Date) {
    super();
    this.publicationId = publicationId;
    this.createdAt = createdAt;
  }
}
