export class ConfigurationModel {
  _id: string;
  profile: string;
  language: string;
  notification: {
    anniversary: boolean,
    mainSoundMessage: boolean,
    identification: boolean,
    group: boolean,
    event: boolean,
    tag: boolean,
    like: boolean,
  };
  totalCharged: number
  chargedBy: string

  constructor(
    language: string,
    // anniversary?: boolean,
    // mainSoundMessage?: boolean,
    // identification?: boolean,
    // group?: boolean,
    // event?: boolean,
    // tag?: boolean,
    // like?: boolean
    ) {
    this.language = language;
    // this.notification.anniversary = anniversary;
    // this.notification.mainSoundMessage = mainSoundMessage;
    // this.notification.identification = identification;
    // this.notification.group = group;
    // this.notification.event = event;
    // this.notification.tag = tag;
    // this.notification.like = like;
  }
}
