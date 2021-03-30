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

  constructor(language: string) {
    this.language = language
  }
}
