export abstract class likeModel {
  constructor(
    public publicationProfile: string,
    public type: string
  ) { }
}

export class likeCommentPublicationModel extends likeModel {
  constructor(
    public publicationProfile: string,
    public type: string,
    public commentID: string,
    public publicationID: string,
    public ownerType: string
  ) { super(publicationProfile, type) }
}

export class likeCommentPlaylistModel extends likeModel {
  constructor(
    public publicationProfile: string,
    public type: string,
    public commentID: string,
    public playlistID: string
  ) { super(publicationProfile, type) }
}

export class likeFeedPublicationModel extends likeModel {
  constructor(
    public publicationProfile: string,
    public type: string,
    public publicationID: string,
    public ownerType: string,
    public hastags?: string[]
  ) { super(publicationProfile, type) }
}