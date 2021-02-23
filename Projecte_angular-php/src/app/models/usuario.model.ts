import { Ranking } from "./ranking.model";

export class Usuario {

  constructor(

    public nickname: string,
    public password: string,
    public firstname?: string,
    public lastname?: string,
    public email?: string,
    public center?: string,
    public ranking?: Ranking[],
    public image?: string,
    public id?: number
  ) { }

  //posar camps no obligatoris menys nick i pass,  ID EL ULTIM

}
