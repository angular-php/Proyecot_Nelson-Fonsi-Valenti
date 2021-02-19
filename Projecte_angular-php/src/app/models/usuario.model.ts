import { Ranking } from "./ranking.model";

export class Usuario {

  constructor(
    public id: number,
    public nickname: string,
    public firstname: string,
    public lastname: string,
    public email: string,
    public password: string,
    //center
    public ranking?: Ranking[],
    public image?: string,
    public center?: string,
    //id
  ) { }

  //posar camps no obligatoris menys nick i pass,  ID EL ULTIM

}
