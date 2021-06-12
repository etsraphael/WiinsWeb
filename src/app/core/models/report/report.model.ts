export class ReportModel {
  constructor(
    public id: string,
    public type: string,
    public comment: string,
    public categorie: number[]
  ) { }
}