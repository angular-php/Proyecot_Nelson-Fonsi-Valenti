import { Ranking } from "./ranking.model";

export class Alumno {

  constructor(
    public nickname: string,
    public firstname: string,
    public lastname: string,
    public email: string,
    public password: string,
    public ranking: Ranking[],
    public image?: string,
  ) { }

}
