import { alumnoRanking } from "./alumnosRanking.model";

export class Ranking {

  constructor(
    public name: string,
    public code: string,
    public idRank?: number,
    public idProfe?: number,
    public usuarios?: alumnoRanking[],
  ) { }

}
