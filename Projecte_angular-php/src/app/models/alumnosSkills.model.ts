export class alumnoSkills{

  public idusu: number;
  public nickname: string;
  public firstname: string;
  public lastname: string;
  public cooperacion: number;
  public emociones: number;
  public pensamiento: number;
  public iniciativa: number;
  public responsabilidad: number;
  public puntosSkills: number;
  public posicion: number;

  constructor(json){
    this.idusu = json.idusu;
    this.nickname = json.nickname;
    this.firstname = json.firstname;
    this.lastname = json.lastname;
    this.cooperacion = json.cooperacion;
    this.emociones = json.emociones;
    this.pensamiento = json.pensamiento;
    this.iniciativa = json.iniciativa;
    this.responsabilidad = json.responsabilidad;
    this.puntosSkills = json.puntosSkills;
  }
}
