import { Ranking } from "./ranking.model";

export class Usuario {

  constructor(
    public nickname: string,
    public firstname: string,
    public lastname: string,
    public email: string,
    public password: string,
    public student: boolean,
    public ranking?: Ranking[],
    public image?: string,
    public center?: string,
  ) { }

}
