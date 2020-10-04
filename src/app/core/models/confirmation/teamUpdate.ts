export class TeamUpdate {
  teamId: string;
  profileId: string;
  catagorie: string;

  constructor(teamId: string, profileId: string, catagorie: string) {
    this.teamId = teamId;
    this.profileId = profileId;
    this.catagorie = catagorie;
  }
}
