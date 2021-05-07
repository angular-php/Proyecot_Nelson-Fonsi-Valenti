import { alumnoRanking } from "./alumnosRanking.model";
import { alumnoSkills } from "./alumnosSkills.model";

export class Ranking {

  constructor(
    public name: string,
    public code: string,
    public idRank?: number,
    public idProfe?: number,
    public usuarios?: alumnoRanking[],
    public usuariosSkills?: alumnoSkills[],
  ) { }

}
